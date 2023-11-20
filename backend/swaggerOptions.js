const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API Agenda',
            version: '0.0.1',
            description: 'Documentación de la API para el aplicativo de Agenda con Swagger',
        },
    },
    apis: ['./router/router.js'],
};

module.exports = swaggerOptions;