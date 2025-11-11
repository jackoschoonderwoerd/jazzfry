import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

import { computed, inject, Signal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { FirebaseError } from "@angular/fire/app";
import { FirestoreService } from "../../../shared/firestore.service";
import { ConfirmService } from "../../../shared/confirm.service";
import { SnackbarService } from "../../../shared/snackbar.service";
import { Venue } from "../../../models/venue.model";
import { PATH_TO_GALLERY, PATH_TO_VENUES } from "../../../models/constants";
import { Router } from "@angular/router";
import { JFImage } from "../../../models/JFImage.model";
import { initialVenueSlice } from "./gallery.slice";
import { StorageService } from "../../../services/storage.service";
import { timeStamp } from "console";


export const GalleryStore = signalStore(
    { providedIn: 'root' },
    withState(initialVenueSlice),
    withComputed((store) => ({
        editmode: computed(() => store.selectedJFImage() ? true : false)
    })),
    withMethods((store) => {
        const fs = inject(FirestoreService); // ✅ Inject once at the top
        const dialog = inject(MatDialog);
        const confirmService = inject(ConfirmService);
        const snackbarService = inject(SnackbarService);
        const router = inject(Router);
        const storage = inject(StorageService)

        return {

            async addImage(file: File, caption: string): Promise<void> {
                if (!file) return;
                patchState(store, { upLoadingImage: true })
                try {
                    const timestamp = Date.now().toString()
                    // 🧱 Setup filenames and paths
                    const filename = `${timestamp}_${file.name}`;
                    const uploadPath = `gallery/${filename}`;
                    const resizedFilenameExtension = '_600x600.webp';
                    const nameHead = filename.split('.')[0];
                    const resizedName = `${nameHead}${resizedFilenameExtension}`;
                    const resizedPath = `gallery/${resizedName}`;
                    console.log(resizedName)

                    // 1️⃣ Upload original file
                    await storage.storeFile(uploadPath, file);
                    console.log('✅ Uploaded original file:', uploadPath);

                    // 2️⃣ Check if resized file already exists
                    const exists = await storage.fileExists(resizedPath);
                    if (exists) {
                        console.warn('⚠️ Resized file already exists; aborting upload.');
                        snackbarService.openSnackbar('A resized version already exists. Upload skipped.');
                        return;
                    }

                    console.log('ℹ️ Waiting for resized image to appear...');

                    // 3️⃣ Wait until the resized file appears (polling)
                    const ready = await waitForFile(storage, resizedPath, 15000);
                    if (!ready) {
                        throw new Error('Timed out waiting for resized image to appear.');
                    }

                    console.log('✅ Resized image detected in Firebase Storage.');

                    // 4️⃣ Get download URL for resized version
                    const resizedDownloadUrl = await storage.getDownloadUrl(resizedPath);
                    console.log('📸 Resized download URL:', resizedDownloadUrl);

                    // 5️⃣ Add image metadata to Firestore
                    const jfImage: JFImage = {
                        downloadUrl: resizedDownloadUrl,
                        datePosted: new Date(),
                        caption,
                    };

                    await fs.addDoc('gallery', jfImage);
                    console.log('🗃️ Added image metadata to Firestore.');

                    // 6️⃣ Notify user and refresh UI
                    snackbarService.openSnackbar('Image added successfully');
                    router.navigateByUrl('/admin/admin-gallery')
                    // await store.getJFImages(); // optional refresh
                    patchState(store, { upLoadingImage: false });

                } catch (error: any) {
                    console.error('❌ Error adding image:', error);
                    snackbarService.openSnackbar(`Error adding image: ${error.message}`);
                    patchState(store, { upLoadingImage: false });
                }
            },

            setImageUpForEdit(image: Signal<JFImage> | null) {
                if (image && image()) {
                    console.log(image())

                    patchState(store, { imageUpForEdit: image() })
                } else {
                    patchState(store, { imageUpForEdit: null })
                }
            },
            async updateCaption(caption: string) {
                console.log(caption)
                console.log(store.imageUpForEdit().id)
                try {
                    const path = `gallery/${store.imageUpForEdit().id}`
                    fs.updateField(path, 'caption', caption)
                    patchState(store, { imageUpForEdit: null });
                    router.navigateByUrl('/admin/admin-gallery')
                } catch (err: any) {
                    console.error(err);
                }
            },

            deleteImage: (id: string, fileUrl?: string) => {
                console.log(fileUrl);
                confirmService.getConfirmation().subscribe(async (confirmation: boolean) => {
                    if (!confirmation) {
                        snackbarService.openSnackbar('operation aborted by user');
                        return;
                    }


                    try {
                        // 1️⃣ Derive the file path from its URL
                        // If you store the exact path when uploading, use that instead of parsing.
                        let filePath: string | undefined;

                        if (fileUrl) {
                            console.log(fileUrl)
                            // return;
                            // Example: https://firebasestorage.googleapis.com/v0/b/myapp.appspot.com/o/gallery%2Ffilename.webp?...
                            const decoded = decodeURIComponent(fileUrl);
                            const match = decoded.match(/\/o\/(.*?)\?/);
                            filePath = match ? match[1] : undefined;
                        }

                        if (!filePath) {
                            snackbarService.openSnackbar('Could not determine file path');
                            return;
                        }


                        // 2️⃣ Delete from Firebase Storage
                        await storage.deleteObject(filePath);

                        // 3️⃣ Delete Firestore document
                        const path = `${PATH_TO_GALLERY}/${id}`;
                        await fs.deleteDoc(path);

                        snackbarService.openSnackbar('Image deleted successfully');
                    } catch (err: any) {
                        console.error(err);
                        snackbarService.openSnackbar(`Error deleting image: ${err.message}`);
                    }
                });
            },


            getJFImages: () => {
                (() => {
                    patchState(store, { loadingGallery: true })
                })
                fs.sortedCollection(PATH_TO_GALLERY, 'datePosted', 'asc').subscribe((jfImages: JFImage[]) => {
                    patchState(store, { jfImages, loadingGallery: false })
                })
            },

        };
    }),
);

async function waitForDownloadUrl(
    storageService: { getDownloadUrl: (path: string) => Promise<string> },
    path: string,
    retries = 50,
    delayMs = 1000
): Promise<string> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const url = await storageService.getDownloadUrl(path);
            console.log(attempt)
            return url;
        } catch (err) {
            if (attempt === retries) throw err;
            console.log(`Retry ${attempt}/${retries}... waiting ${delayMs}ms`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
    throw new Error('Failed to get download URL after retries');
}



// async function waitForFile(storage: any, path: string, timeoutMs = 10000): Promise<boolean> {
//     const start = Date.now();
//     while (Date.now() - start < timeoutMs) {
//         if (await storage.fileExists(path)) return true;
//         await new Promise(r => setTimeout(r, 1000));
//     }
//     return false;
// }

async function waitForFile(
    storage: any,
    path: string,
    timeoutMs = 10000,
    intervalMs = 1000
): Promise<boolean> {
    const start = Date.now();

    while (Date.now() - start < timeoutMs) {
        try {
            const exists = await storage.fileExists(path);
            if (exists) return true;
        } catch (err) {
            // Ignore errors — just means file not found yet
        }

        await new Promise(res => setTimeout(res, intervalMs));
    }

    return false; // timed out
}
