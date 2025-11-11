import { JFImage } from "../../../models/JFImage.model";



export interface GallerySlice {
    jfImages: JFImage[];
    loadingGallery: boolean;
    selectedJFImage: JFImage;
    upLoadingImage: boolean;
    imageUpForEdit: JFImage;


    // readonly staffMember: StaffMember;
    // readonly editmode: boolean;
}

export const initialVenueSlice: GallerySlice = {
    jfImages: [],
    loadingGallery: false,
    selectedJFImage: null,
    upLoadingImage: false,
    imageUpForEdit: null
}
