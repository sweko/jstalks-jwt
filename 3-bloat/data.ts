export const payload = {
    // Registered Claims
    iss: 'should-be-an-url',
    sub: 'UserID-123',
    aud: 'audience',
    exp: 1698761465,
    iat: 1697206265,
    // Private Claims
    admin: false,
    username: 'johndoe',
    name: 'John Doe',
    email: 'john.doe@example.com',
};

export const bloatedPayload = {
    ...payload,
    // Data that is not really a user claim
    orderHistory: [
        {
            orderNumber: '123',
            orderDate: '2021-01-01',
            orderTotal: 123.45,
        },
        {
            orderNumber: '456',
            orderDate: '2021-02-01',
            orderTotal: 456.78,
        },
        {
            orderNumber: '789',
            orderDate: '2021-03-01',
            orderTotal: 789.01,
        },
        {
            orderNumber: '012',
            orderDate: '2021-04-01',
            orderTotal: 12.34,
        },
        {
            orderNumber: '345',
            orderDate: '2021-05-01',
            orderTotal: 345.67,
        },
        {
            orderNumber: '678',
            orderDate: '2021-06-01',
            orderTotal: 678.90,
        },
        {
            orderNumber: '901',
            orderDate: '2021-07-01',
            orderTotal: 901.23,
        },
        {
            orderNumber: '234',
            orderDate: '2021-08-01',
            orderTotal: 234.56,
        },
        {
            orderNumber: '567',
            orderDate: '2021-09-01',
            orderTotal: 567.89,
        },
        {
            orderNumber: '890',
            orderDate: '2021-10-01',
            orderTotal: 890.12,
        },
        {
            orderNumber: '123',
            orderDate: '2021-11-01',
            orderTotal: 123.45,
        },
        {
            orderNumber: '456',
            orderDate: '2021-12-01',
            orderTotal: 456.78,
        }
    ],
    social: {
        facebook: 'https://facebook.com/johndoe',
        twitter: 'https://twitter.com/@johndoe',
        instagram: 'https://instagram.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        youtube: 'https://youtube.com/johndoe',
        github: 'https://github.com/johndoe',
        twitch: 'https://twitch.tv/johndoe',
        discord: 'https://discord.gg/johndoe',
        tiktok: 'https://tiktok.com/@johndoe',
        snapchat: 'https://snapchat.com/add/johndoe',
        pinterest: 'https://pinterest.com/johndoe',
        reddit: 'https://reddit.com/u/johndoe',
        medium: 'https://medium.com/@johndoe',
        tumblr: 'https://tumblr.com/johndoe',
        whatsapp: 'https://wa.me/johndoe',
        telegram: 'https://t.me/johndoe',
        signal: 'https://signal.org/johndoe',
        slack: 'https://slack.com/johndoe',
        skype: 'https://skype.com/johndoe',
        zoom: 'https://zoom.com/johndoe',
        clubhouse: 'https://clubhouse.com/johndoe',
        yelp: 'https://yelp.com/johndoe',
        spotify: 'https://spotify.com/johndoe',
        soundcloud: 'https://soundcloud.com/johndoe',
        bandcamp: 'https://bandcamp.com/johndoe',
        vimeo: 'https://vimeo.com/johndoe',
    },
};