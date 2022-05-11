import DOMPurify from 'dompurify';
import parse from 'html-react-parser'


export const htmlParse = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString,{ USE_PROFILES: { html: true } });
    const html = parse(cleanHtmlString);
    return html;
}