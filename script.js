type="module"
import QrCode from './qrcode.mjs';

const size = '136'
    const url = '130'

    let facttext = document.querySelector('#facttext');
    let numberinput = document.querySelector('#numberinput');
    numberinput.addEventListener('input', getfecth);

    function getfecth() {
        let number = numberinput.value;
        fetch('http://localhost:8080/user/' + number)
            .then(response => response.json())
            .then(data => {
                facttext.innerHTML = ''
                qrcode.innerHTML = "";
                if (number != '') {
                    facttext.style.display = 'block';
                    const li = document.createElement('li')

                                         li.innerHTML = `<ul> 
                                            <div style="display:flex;margin-bottom:10px;">
                                                <h1 style="font-size:50px; font-weight: bolder; margin-bottom:0px;margin-top:0px;font-family: arial;"> ${data.Aname.Name} </h1>  
                                                <h1 style="font-size:50px; font-weight: bolder; margin-bottom:0px;margin-top:0px;font-family: arial; width:60px;overflow:hidden;text-overflow:ellipsis;padding:0px 20px;resize:horizontal;">${data.Aname.Mname}</h1>
                                                <h1 style="font-size:50px; font-weight: bolder; margin-bottom:0px;margin-top:0px;font-family: arial;padding:0px 5px;">.</h1> 
                                                <h1 style="font-size:50px; font-weight: bolder; margin-bottom:0px;margin-top:0px;font-family: arial;padding:0px 20px;"> ${data.Aname.Surname} </h1> 
                                            </div>
                                        <h1 style="font-size:38px; font-weight: bolder; margin-top:.2rem;margin-bottom:8px;margin-left:15.5rem;font-family: arial;"> ${data.YearofAdmin} </h1>
                                        <h1 style="font-size:38px; margin-top:0px;margin-bottom:10px;margin-left:20rem;font-weight: bolder;font-family: arial;"> ${data.ParentPhoneNo} </h1>
                                        <h1 style="font-size:38px; margin-top: 1rem;margin:0px;margin-left:21rem;; margin-bottom:-1rem;font-weight: bolder;font-family: arial;"> ${data.HometownCommunity} </h1>
                                        <h1 style="font-size:38px; margin-top:26px;margin-bottom:-15.4rem;margin-left:23rem;font-weight: bolder;font-family: arial;"> ${data.Bloodgroup} </h1>
                                        <h1 style="font-size:38px; margin-top:-9rem;margin:0px;margin-left:46.5%;font-weight: bolder;font-family: arial;"> ${data.Gender} </h1>
                                        </ul>
                                        <img style="border-radius: 5%;object-fit: cover; height: 362px;width: 330px;display: flex;margin-left: 66%;margin-top:-16%;"src="${data.picturepath}">
                                        `
                      
                                        
                                        
                                        function renderHtml(matrix) {
                                            // '▀', '▄', '█' // '\u{0020}' space, '\u{2580}' upper half block, '\u{2584}' lower half block, '\u{2588}' block
                                            // Figure space: '\u{2007}'
                                            const renderOptions = {
                                                segments: ['<span>&nbsp;</span>', '<span>▀</span>', '<span>▄</span>', '<span>█</span>'],
                                                sep: '<br>',
                                            };
                                            return QrCode.render('medium', matrix, renderOptions);
                                        }
                                        
                                        
                                        
                                        function change() {
                                            const input = 'ljml;m/lm';
                                            let text;
                                            let svg;
                                            try {
                                                const ecl = 'L+';
                                                const qrOptions = {
                                                    errorCorrectionLevel: QrCode.ErrorCorrectionLevel[ecl[0]],
                                                    optimizeEcc: ecl.includes('+'),
                                                };
                                                const matrix = QrCode.generate(input, qrOptions);
                                                text = renderHtml(matrix);
                                                const renderOptions = {
                                                };
                                                svg = QrCode.render('svg', matrix, renderOptions);
                                            } catch (e) {
                                                text = 'Error: ' + e;
                                            }
                                            const textElement = document.querySelector('#output_text');
                                            const imgElement = document.querySelector('#output_img img');
                                            const svgElement = document.querySelector('#output_svg svg');
                                            textElement.innerHTML = text;
                                            imgElement.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
                                            imgElement.alt = input;
                                            svgElement.alt = input;
                                            if (svg) {
                                                svgElement.outerHTML = svg;
                                            } else {
                                                svgElement.innerHTML = svg;
                                            }
                                        }
                                        
                                        function copyMultiLinePlainTextToClipboard(text) {
                                            const temp = document.createElement('textarea');
                                            temp.value = text;
                                            document.body.appendChild(temp);
                                            temp.select();
                                            document.execCommand('copy');
                                            document.body.removeChild(temp);
                                        }
                                        
                                        function safeFilename(text) {
                                            return text.replaceAll(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
                                        }
                                        
                                        async function dataUriToBlob(dataUri) {
                                            try {
                                                return await (await fetch(dataUri)).blob();
                                            } catch (e) {
                                                const protocolParts = dataUri.split(':');
                                                if (protocolParts[0] != 'data') throw new Error('Invalid data URI');
                                                const nonProtocol = protocolParts.slice(1).join(':');
                                                const dataParts = nonProtocol.split(',');
                                                const metaParts = dataParts[0].split(';');
                                                const type = metaParts[0];
                                                const encoding = metaParts[1];
                                                const rawData = dataParts.slice(1).join('');
                                                const data = encoding == 'base64' ? atob(rawData) : decodeURIComponent(rawData);
                                                const bytes = [];
                                                for (let i = 0; i < binary.length; i++) bytes.push(data.charCodeAt(i));
                                                return new Blob([new Uint8Array(bytes)], { type });
                                            }
                                        }
                                        
                                        async function rasterizeImageToBlob(src, type = 'image/png') {
                                            const img = new Image();
                                              const ctx = document.createElement('CANVAS').getContext('2d');
                                            img.crossOrigin = '';
                                            img.src = src;
                                            return new Promise(resolve => {
                                                img.onload = () => {
                                                    ctx.canvas.width = img.naturalWidth;
                                                    ctx.canvas.height = img.naturalHeight;
                                                    ctx.drawImage(img, 0, 0);
                                                    ctx.canvas.toBlob((blob) => resolve(blob), type);
                                                };
                                            });
                                        }
                                        
                                        function svgToBlob(svg, type = 'image/svg+xml') {
                                            return new Blob([svg], { type });
                                        }
                                        
                                        
                                        function click_text() {
                                            const text = document.querySelector('#output_text').innerText;
                                            copyMultiLinePlainTextToClipboard(text);
                                            document.querySelector('#text').focus();
                                        }
                                        
                                        
                                        
                                        
                                        

        facttext.appendChild(li)

    }
 
    });
    const clearUI = () => {
        qrcode.innerHTML = "";
        const saveBtn = document.getElementById("save-link");
        if (saveBtn) {
            saveBtn.remove();
        }
    };

}


function start() {
    //document.querySelector('#text').addEventListener('input', change);
    
    document.querySelector('#output_text').addEventListener('click', click_text);
    
    //document.querySelector('#text').focus();
    change();
}

window.addEventListener('DOMContentLoaded', start);