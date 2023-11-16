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

df = pd.DataFrame(datos)


archivo_excel = 'EjemploExportacion.xlsx'

df.to_excel(archivo_excel, index=False)

print(f'Se ha exportado el DataFrame a {archivo_excel}')