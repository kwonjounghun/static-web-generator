function getEnvironment() {
    if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
        return 'Browser';
    } else {
        return 'Node';
    }
}

export default getEnvironment;
