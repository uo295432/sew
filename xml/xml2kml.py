import xml.etree.ElementTree as ET

class Kml(object):
    def __init__(self):
        """
        Crea el elemento raíz y el espacio de nombres
        """
        self.raiz = ET.Element('kml', xmlns="http://www.opengis.net/kml/2.2")
        self.doc = ET.SubElement(self.raiz,'Document')

    def addPlacemark(self,nombre,descripcion,long,lat,alt, modoAltitud):
        """
        Añade un elemento <Placemark> con puntos <Point>
        """
        pm = ET.SubElement(self.doc,'Placemark')
        ET.SubElement(pm,'name').text = '\n' + nombre + '\n'
        ET.SubElement(pm,'description').text = '\n' + descripcion + '\n'
        punto = ET.SubElement(pm,'Point')
        ET.SubElement(punto,'coordinates').text = '\n{},{},{}\n'.format(long,lat,alt)
        ET.SubElement(punto,'altitudeMode').text = '\n' + modoAltitud + '\n'

    def addLineString(self,nombre,extrude,tesela, listaCoordenadas, modoAltitud, color, ancho):
        """
        Añade un elemento <Placemark> con líneas <LineString>
        """
        ET.SubElement(self.doc,'name').text = '\n' + nombre + '\n'
        pm = ET.SubElement(self.doc,'Placemark')
        ls = ET.SubElement(pm, 'LineString')
        ET.SubElement(ls,'extrude').text = '\n' + extrude + '\n'
        ET.SubElement(ls,'tessellation').text = '\n' + tesela + '\n'
        ET.SubElement(ls,'coordinates').text = '\n' + listaCoordenadas + '\n'
        ET.SubElement(ls,'altitudeMode').text = '\n' + modoAltitud + '\n'

        estilo = ET.SubElement(pm, 'Style')
        linea = ET.SubElement(estilo, 'LineStyle')
        ET.SubElement (linea, 'color').text = '\n' + color + '\n'
        ET.SubElement (linea, 'width').text = '\n' + ancho + '\n'

    def escribir(self,nombreArchivoKML):
        """
        Escribe el archivo KML con declaración y codificación
        """
        arbol = ET.ElementTree(self.raiz)
        arbol.write(nombreArchivoKML, encoding='utf-8', xml_declaration=True)

    def ver(self):
        """
        Muestra el archivo KML. Se utiliza para depurar
        """
        print("\nElemento raiz = ", self.raiz.tag)

        if self.raiz.text != None:
            print("Contenido = "    , self.raiz.text.strip('\n')) #strip() elimina los '\n' del string
        else:
            print("Contenido = "    , self.raiz.text)

        print("Atributos = "    , self.raiz.attrib)

        # Recorrido de los elementos del árbol
        for hijo in self.raiz.findall('.//'): # Expresión XPath
            print("\nElemento = " , hijo.tag)
            if hijo.text != None:
                print("Contenido = ", hijo.text.strip('\n')) #strip() elimina los '\n' del string
            else:
                print("Contenido = ", hijo.text)
            print("Atributos = ", hijo.attrib)

    def insertarPlaceMarks(self,archivoXML):
        try:

            arbol = ET.parse(archivoXML)

        except IOError:
            print ('No se encuentra el archivo ', archivoXML)
            exit()

        except ET.ParseError:
            print("Error procesando en el archivo XML = ", archivoXML)
            exit()

        raiz = arbol.getroot()
        contPuntos=0
        cont=0
        coordenadasPaseo=""
        contPrimero=0
        longitud_final=0
        latitud_final=0
        altitud_final=0

        namespaces = {'ns': 'http://www.uniovi.es'}

        # Recorrido de los elementos del árbol
        for hijo in raiz.findall('.//'): # Expresión Path
            if hijo.tag == '{http://www.uniovi.es}longitud' and contPuntos==1:
                longitud=hijo.text.strip('\n')
                if contPrimero==0:
                    longitud_final=hijo.text.strip('\n')
            elif hijo.tag == '{http://www.uniovi.es}latitud' and contPuntos==1:
                latitud=hijo.text.strip('\n')
                if contPrimero==0:
                    latitud_final=hijo.text.strip('\n')
            elif hijo.tag == '{http://www.uniovi.es}altitud' and contPuntos==1:
                altitud=hijo.text.strip('\n')
                if contPrimero==0:
                    altitud_final=hijo.text.strip('\n')
                    contPrimero=1
                cont+=1;
                self.addPlacemark(
                f'Punto{cont}', 'Circuito de Bakú',
                longitud, latitud, altitud, 'relativeToGround')
                coordenadasPaseo += f'{longitud},{latitud},{altitud}\n'
            elif hijo.tag == '{http://www.uniovi.es}altitud' and contPuntos==0:
                contPuntos=1
        coordenadasPaseo += f'{longitud_final},{latitud_final},{altitud_final}'
        return coordenadasPaseo


def main():

    print(Kml.__doc__)

    """Prueba unitaria de la clase Kml"""

    nombreXML = input('Introduzca el nombre del archivo XML(incluido .xml) = ')

    nombreKML = input('Introduzca el nombre del archivo KML(incluido .kml) = ')

    nuevoKML = Kml()

    coordenadasPaseo=nuevoKML.insertarPlaceMarks(nombreXML)

    nuevoKML.addLineString("Circuito Bakú","1","1",
                           coordenadasPaseo,'relativeToGround',
                           '#ff0000ff',"5")

    """Visualización del KML creado"""
    nuevoKML.ver()

    """Creación del archivo en formato KML"""
    nuevoKML.escribir(nombreKML)
    print("Creado el archivo: ", nombreKML)

if __name__ == "__main__":
    main()
