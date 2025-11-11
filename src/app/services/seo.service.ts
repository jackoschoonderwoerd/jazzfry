import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SeoService {
    private isBrowser: boolean;

    constructor(
        private title: Title,
        private meta: Meta,
        @Inject(DOCUMENT) private doc: Document,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    /**
     * Sets title, description, and optional OG/Twitter tags
     */
    setMeta(options: {
        title: string;
        description: string;
        url?: string;
        image?: string;
    }) {
        const { title, description, url, image } = options;

        // Title & meta
        this.title.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'robots', content: 'index, follow' });

        // Open Graph
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        if (image) this.meta.updateTag({ property: 'og:image', content: image });
        if (url) this.meta.updateTag({ property: 'og:url', content: url });

        // Twitter Card
        this.meta.updateTag({ name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        if (image) this.meta.updateTag({ name: 'twitter:image', content: image });

        // Canonical URL
        if (url && this.isBrowser) {
            this.setCanonical(url);
        }
    }

    private setCanonical(url: string) {
        let link: HTMLLinkElement | null = this.doc.querySelector("link[rel='canonical']");
        if (!link) {
            link = this.doc.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.doc.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }
}
