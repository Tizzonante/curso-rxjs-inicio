import { Observable, of, Subscription } from "rxjs";

//1 Creamos el observable con la funcion of
const seq$: Observable<number> = of(1, 2, 3, 4, 5, ...[10, 9, 8], 111);

//2) Creamos la suscripcion
console.log("Inicia la suscripcion y la secuencia");
const miSubs: Subscription = seq$.subscribe(
  (valor) => console.log(`next:${valor}`),
  (err) => console.error(err),
  () => console.log("Secuencia completada")
);
console.log("Termina la secuencia");

//Debido a que el observable seq$ si emite el metodo complete cuando la secuencia se termina de emitir,
//ya no es necesario mandar a llamar el unsubscribe, sin embargo, lo mando a llamar tambien en la liena de abajo
//aunque no es necesario
miSubs.unsubscribe();
