# El objetivo de este proyecto es traer informacion de una api de 
# aliexpress de las ultimas compras y que esto se vaya a un excel 

# Como añadido: que se pueda enviar un reporte mensual 
# con las compras realizadas al correo 

import pandas as pd



datos = [{'Nombre':'Bulbasaur',
         'Cantidad': 2,
         'Precio': 4000},
         {'Nombre': 'Charmander',
         'Cantidad': 1,
         'Precio': 9000}]

data2 = "./ExportData2.csv"
df = pd.DataFrame(datos)

df2 = pd.read_csv(data2,sep=',')

print(df2.columns)
columnaPrecioCantidad = df2['Precio - Cantidad']
print(columnaPrecioCantidad)
for fila in columnaPrecioCantidad.values:
    print(fila)


archivo_excel = 'EjemploExportacion.xlsx'

df2.to_excel(archivo_excel, index=False)

print(f'Se ha exportado el DataFrame a {archivo_excel}')