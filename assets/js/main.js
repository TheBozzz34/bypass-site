const button = document.getElementById('button');


function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

async function clear() {
    document.getElementById('url').value = '';
    button.innerHTML = 'Bypass';
    button.addEventListener('click', handleClick);
}

async function handleClick() {
    let url = document.getElementById('url').value;
    if (validateUrl(url)) {
        console.log('Bypassing');
        button.removeEventListener('click', handleClick);
        button.innerHTML = 'Bypassing...';
        try {
            const response = await axios.get('https://bypass.bot.nu/bypass2?url=' + url);
            console.log(response.data.destination);
            var html = '<a id=output href="' + response.data.destination + '">' + response.data.destination + '</a>';                  
            document.body.insertAdjacentHTML('beforeend', html);
            button.innerHTML = 'Bypassed Successfully!';
            button.addEventListener('click', handleClick);
            setTimeout(() => { clear(); }, 5000);

        } catch (error) {
            console.error(error);
        }
    }  else {
            console.log('Not bypassing');
            button.addEventListener('click', handleClick);
    }        
        
    
}


button.addEventListener('click', handleClick);
    