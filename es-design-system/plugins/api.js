export default async (ctx, inject) => {
    // Initialize API repositories
    const api = {};

    ctx.$api = api;

    inject('api', api);
};
