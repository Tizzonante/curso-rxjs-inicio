import { Observable, Subscriber, Observer, Subscription, Subject } from "rxjs";

/******************************
 * 1) CREAMOS EL OBSERVER  ****
 * ***************************/
const miObserver: Observer<number> = {
  next: (numero) => console.log("next:", numero),
  error: (err) => console.warn("error-sazo:", err),
  complete: () => console.log("ya concluyó el observable"),
};

/********************************
 * 2) CREAMOS EL OBSERVABLE  ****
 * *****************************/
const invervalo$ = new Observable<number>((subscriber) => {
  const inter = setInterval(() => {
    const rand = Math.random();
    console.log(`funcion interval: ${rand}`);
    subscriber.next(rand);
  }, 1000);

  return () => {
    clearInterval(inter);
    console.log("invervalo destruido");
  };
});

/********************************************************************************
 * Subject:Es un tipo especial de observable que tiene estas caracteristicas:
 * 1.- Casteo multiple: es decir, muchas suscripciones van a estar sujetas a este
 * mismo subject y este subject va a servir para distribuir la misma informacion a
 * todas las suscripciones.
 * 2.- Un Subject tambien es un Observable y un Observer.
 * 3.- En un Subject tambien se puede manejar next(), error() y complete()
 * ***********************************************************************************/
/******************************
 * 3) CREAMOS EL SUBJECT  ****
 * ***************************/
const subject$ = new Subject<number>();

const intervalSubjectSubs: Subscription = invervalo$.subscribe(subject$); //ligamos el subject a el intervalo$, es decir, creamos una
//suscription para suscribir el subject$ a el intervalo$

//aqui creamos 2 suscripciones a el subject$
const miSubscription1: Subscription = subject$.subscribe(miObserver);
const miSubscription2: Subscription = subject$.subscribe(miObserver);

miSubscription1.add(intervalSubjectSubs); //linea necesaria para matar el setInterval que esta dentro del observable una vez que concluya el subject
miSubscription2.add(intervalSubjectSubs); //esta linea no es necesaria pues miSubscription1 y miSubscription2 estan ligadas a el mismo subject

setTimeout(() => {
  subject$.next(15);
  subject$.complete();
  //intervalSubjectSubs.unsubscribe();//asi tambien puedes matar el setInterval que esta dentro del Observable, y qutarias las lineas 48 y 49
}, 3500);

//esta es otra forma de crear 2 suscripciones a el subject$, como lo que hacemos en la linea 45 y 46
/*const miSubscription1 = subject$.subscribe((numero) =>
  console.log(`Subs1: ${numero}`)
);
const miSubscription2 = subject$.subscribe((numero) =>
  console.log(`Subs2: ${numero}`)
);*/
