export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    printType: string;
    categories: string[];
    previewLink: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    searchInfo: {
      textSnippet: string;
    };
  };
}
