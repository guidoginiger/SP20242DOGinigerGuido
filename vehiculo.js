class Vehiculo
{
    id = 0;
    modelo = "";
    anoFabricacion = 0;
    velMax = 0;

    constructor(id,modelo,anoFabricacion,velMax)
    {                
        this.id = id;  
        this.modelo = modelo;
        this.anoFabricacion = anoFabricacion; 
        this.velMax = velMax;                         
    }
    toString() 
    {
        return this.id + " - " + this.modelo + " - " + this.anoFabricacion + " - " + this.velMax;
    }         
  
}
class Auto extends Vehiculo
{
    cantidadPuertas = 0;
    asientos = 0;

    constructor(id,modelo,anoFabricacion,velMax,cantidadPuertas,asientos)
    {                
        super(id,modelo,anoFabricacion,velMax);
        this.cantidadPuertas = cantidadPuertas;
        this.asientos = asientos;

    }
    toString() 
    {
        return super.toString() + " - " + this.cantidadPuertas + " - " + this.asientos;
    }     
}
class Camion extends Vehiculo
{
    carga = 0;
    autonomia = 0;

    constructor(id,modelo,anoFabricacion,velMax,carga,autonomia)
    {                
        super(id,modelo,anoFabricacion,velMax);
        this.carga = carga;
        this.autonomia = autonomia;

    }
    toString() 
    {
        return super.toString() + " - " + this.carga + " - " + this.autonomia;
    }     
}