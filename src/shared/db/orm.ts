import { MikroORM } from '@mikro-orm/mysql'; // ⚠️ Importar desde el paquete del driver
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entidad.js'],
  entitiesTs: ['src/**/*.entidad.ts'],
  dbName: 'ferrocarril',
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    disableForeignKeys: false,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});


export const syncSchema = async () => {
    const generador = orm.getSchemaGenerator();
    // await generador.dropSchema(); // nunca en produccion
    // await generador.createSchema(); // nunca en produccion
    await generador.updateSchema();
}