import Provider from 'oidc-provider';
import test from '@/sample.js';
import dir from '@/dir/index.js';
const run = () => {
    test();
    dir.get();
    const app = new Provider('http://localhost:3000', {
        clientDefaults: {
            grant_types: ['implicit', 'authorization_code', 'refresh_token'],
        },
        features: {
            clientCredentials: { enabled: true },
            devInteractions: { enabled: false },
            introspection: { enabled: true },
            jwtIntrospection: { enabled: true },
            jwtUserinfo: { enabled: true },
            userinfo: { enabled: true },
        },
        responseTypes: ['code', 'id_token', 'id_token token', 'code id_token', 'code token', 'code id_token token', 'none'],
        routes: {
            introspection: '/introspect',
            token: '/token',
            userinfo: '/userinfo',
        },
    });
    app.listen('3000', async () => {
        console.log(`We 'gon run it up.`);
    });
};
run();
