export const convertInHTML = (string) => {
    let div =  document.createElement('div');
    div.innerHTML = string;
    return div
}