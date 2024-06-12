const URL_FORM = {
    SERVER_PORT: 3000,
    SERVER_HOST: 'localhost',
    PROTOCOL_TYPE: 'http',
}
export const env = {
    SERVER_URL: `${ URL_FORM.PROTOCOL_TYPE }://${ URL_FORM.SERVER_HOST }:${ URL_FORM.SERVER_PORT }/api`
}