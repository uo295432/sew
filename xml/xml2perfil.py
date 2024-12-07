import xml.etree.ElementTree as ET
class Svg(object):
    def __init__(self):
        """
        Crea el elemento raíz y el espacio de nombres
        """
        self.raiz = ET.Element('svg', xmlns="http://www.w3.org/2000/svg",version="2.0")

    def escribir(self,nombreArchivo):
        arbol = ET.ElementTree(self.raiz)
        arbol.write(nombreArchivo, encoding='utf-8', xml_declaration=True)

    def agregar_polyline(self, puntos, estilo):
        ET.SubElement(self.raiz, 'polyline', {
            'points': ' '.join(f"{x},{y}" for x, y in puntos),
            'style': estilo
        })

    def agregar_texto(self, x, y, texto, estilo):
        text = ET.SubElement(self.raiz, 'text', {
            'x': str(x),
            'y': str(y),
            'style': estilo
        })
        text.text = texto

    def obtenerAltitudes(self,archivoXML):
        try:

            arbol = ET.parse(archivoXML)

        except IOError:
            print ('No se encuentra el archivo ', archivoXML)
            exit()

        except ET.ParseError:
            print("Error procesando en el archivo XML = ", archivoXML)
            exit()

        raiz = arbol.getroot()
        namespaces = {'ns': 'http://www.uniovi.es'}
        altitudes=[]

        for hijo in raiz.findall('.//'): # Expresión Path
            if hijo.tag == '{http://www.uniovi.es}altitud':
                altitudes.append(float(hijo.text.strip('\n')))
        return altitudes

    def obtenerDistancias(self,archivoXML):
        try:

            arbol = ET.parse(archivoXML)

        except IOError:
            print ('No se encuentra el archivo ', archivoXML)
            exit()

        except ET.ParseError:
            print("Error procesando en el archivo XML = ", archivoXML)
            exit()

        raiz = arbol.getroot()
        namespaces = {'ns': 'http://www.uniovi.es'}
        distancias=[]

        for hijo in raiz.findall('.//'): # Expresión Path
            if hijo.tag == '{http://www.uniovi.es}distancia':
                distancias.append(float(hijo.text.strip('\n')))
        return distancias

def main():
    nombreXML = input('Introduzca el nombre del archivo XML(incluido .xml) = ')

    nombreSVG = input('Introduzca el nombre del archivo SVG(incluido .svg) = ')

    nuevoSVG = Svg()

    puntos=[]
    distancias=[]
    altitudes=[]

    altitudes=nuevoSVG.obtenerAltitudes(nombreXML)
    distancias=nuevoSVG.obtenerDistancias(nombreXML)

    x=10
    y_fija=400

    puntos.append((10,y_fija-(altitudes[0]*100)+100))

    for i in range(len(altitudes)):
        if i ==0:
            y=y_fija-(altitudes[i]*100)
            puntos.append((x,y))
        else:
            x=x+(distancias[i-1]*0.24)
            y=y_fija-(altitudes[i]*100)
            puntos.append((x,y))

    puntos.append((x,y_fija-(altitudes[0]*100)+100))
    puntos.append((10,y_fija-(altitudes[0]*100)+100))

    nuevoSVG.agregar_polyline(puntos, "fill:white;stroke:red;stroke-width:4")

    cont=2

    for i in range(len(puntos)):
        if(i!=0 and i!=1 and i!=len(puntos)-1 and i!=len(puntos)-2 and i!=len(puntos)-3):
            if(i!=7 and i!=12):##Estos dos puntos se dejan fuera para mayor claridad, al estar muy juntos del resto
                x,y= puntos[i]
                nuevoSVG.agregar_texto(x, y_fija-(altitudes[0]*100)+120 , f'Punto{cont}',
                "writing-mode: tb; glyph-orientation-vertical: 0;")
            cont+=1
        elif(i==0):
            x,y= puntos[i]
            nuevoSVG.agregar_texto(x,y_fija-(altitudes[0]*100)+120 , "Inicio",
            "writing-mode: tb; glyph-orientation-vertical: 0;")
        elif(i==len(puntos)-2):
            x,y= puntos[i]
            nuevoSVG.agregar_texto(x,y_fija-(altitudes[0]*100)+120 , "Final",
            "writing-mode: tb; glyph-orientation-vertical: 0;")


    nuevoSVG.escribir(nombreSVG)

    print("Creado el archivo: ", nombreSVG)

if __name__ == '__main__':
    main()
