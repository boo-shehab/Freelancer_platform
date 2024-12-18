const fetchData = async (url, options = {}, headers = {}) => {
    try {
        const token = localStorage.getItem('accessToken');
        const defaultHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...headers,
        };

        const response = await fetch(
            `http://16.170.247.41:80/api/web/v1/${url}`,
            { ...options, headers: defaultHeaders }
        );

        if (!response.ok) {
            let errorBody;
            try {
                errorBody = await response.json();
            } catch {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            throw new Error(errorBody.message || `HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
};

export default fetchData;
