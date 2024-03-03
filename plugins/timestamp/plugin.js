CKEDITOR.plugins.add('timestamp', {
    icons: 'timestamp',
    init: function (editor) {
        editor.addCommand('insertTimestamp', {
            exec: function (editor) {
                openCustomDialog(editor);
            }
        });
        editor.ui.addButton('Timestamp', {
            label: 'Insert Timestamp',
            command: 'insertTimestamp',
            toolbar: 'insert',
        });

        editor.on('doubleclick', function (event) {
            const element = event.data.element;

            if (element && element.$.classList.contains('timestamp-image')) {
                openCustomDialog(editor);
            }
        });
    }
});

function openCustomDialog(editor) {
    Swal.fire({
        title: 'Timestamp',
        html: '<iframe id="timestampFrame" width="100%" height="400px" frameborder="0" src="../../samples/index.html"></iframe>',
        showCloseButton: true,
        showConfirmButton: true,
        customClass: {
            closeButton: 'swal-close-button',
            content: 'swal-content'
        },
    }).then((result) => {
        if (result.isConfirmed) {
            const iframe = document.getElementById('timestampFrame');
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const inputField = iframeDocument.getElementById('RenderedLatex');
            let textContent = inputField.innerHTML;

            const inputfiled2 = iframeDocument.getElementById('math-Iput') ;

            html2canvas(inputField).then(canvas => {
                const trimmedCanvas = removeWhitespace(canvas);
                const trimmedImageData = trimmedCanvas.toDataURL('image/png');

                Swal.fire("Saved!", textContent, "success");
                const imgElement = '<img src="' + trimmedImageData + '" alt="timestamp" class="timestamp-image">';
                editor.insertHtml(imgElement);
            });
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
    function removeWhitespace(originalCanvas) {
        const imgWidth = originalCanvas.width;

        
        const imgHeight = originalCanvas.height;

        const imageData = originalCanvas.getContext("2d").getImageData(0, 0, imgWidth, imgHeight);
        const data = imageData.data;

        const getRBG = function (x, y) {
            return {
                red: data[(imgWidth * y + x) * 4],
                green: data[(imgWidth * y + x) * 4 + 1],
                blue: data[(imgWidth * y + x) * 4 + 2]
            };
        };

        const isWhite = function (rgb) {
            return rgb.red == 255 && rgb.green == 255 && rgb.blue == 255;
        };

        const scanX = function (fromLeft) {
            const offset = fromLeft ? 1 : -1;

            for (let x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {
                for (let y = 0; y < imgHeight; y++) {
                    if (!isWhite(getRBG(x, y))) {
                        return x;
                    }
                }
            }
            return null;
        };
        const scanRight = scanX(false);
        const scanLeft = scanX(true);

        const trimmedCanvas = document.createElement('canvas');
        const trimmedContext = trimmedCanvas.getContext('2d');

        const croppedWidth = scanRight - scanLeft;
        const croppedHeight = imgHeight;

        trimmedCanvas.width = croppedWidth;
        trimmedCanvas.height = croppedHeight;

        trimmedContext.drawImage(
            originalCanvas,
            scanLeft,
            0,
            croppedWidth,
            croppedHeight,
            0,
            0,
            croppedWidth,
            croppedHeight
        );

        return trimmedCanvas;
    }
}
