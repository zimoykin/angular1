
export class ImageService {

    async resizeImage (file: Blob): Promise<Blob> {
      //  alert('reseze 0')
        let img = document.createElement("img");
    
        img.src = await new Promise<any>(resolve => {
            let reader = new FileReader();
            reader.onload = (e: any) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
       // alert('reseze 1')
        await new Promise(resolve => 
            img.onload = resolve
        )
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

       // alert('reseze 2')

        let MAX_WIDTH = 2000;
        let MAX_HEIGHT = 1000;

        let width = img.naturalWidth;
        let height = img.naturalHeight;
       // alert('reseze 3')
        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
      //  alert('reseze 4')

        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
       // alert('reseze 5')
        let result = await new Promise<Blob>(resolve => {
            canvas.toBlob(resolve, 'image/jpeg', 0.95); 
        });
    
        return result;
        
    }

}