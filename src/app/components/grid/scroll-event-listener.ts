let timeout: NodeJS.Timeout;

const debounce = (method: () => void): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => method(), 100);
}

const scrollListener = (atBottom: () => void): void => {
    const documentHeight = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if(currentScroll + 200 > documentHeight) {
        atBottom();
    }
}

const debouncedListener = (atBottom: () => void) => {
    debounce(() => scrollListener(() => atBottom()));
}

export { debounce, scrollListener, debouncedListener }