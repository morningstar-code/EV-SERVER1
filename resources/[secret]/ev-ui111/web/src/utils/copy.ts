export function copyToClipboard(value) {
    try {
        var input = document.createElement('input');
        input.setAttribute('value', value);
        document.body.appendChild(input);
        input.select();
        var copied = document.execCommand('copy');
        document.body.removeChild(input);
        return copied;
    } catch (error) {
        console.error('could not copy to clipboard: ', error);
    }
}