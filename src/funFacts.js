export const funFacts = [
    "Aktywność fizyczna poprawia nastrój. Ćwiczenia fizyczne powodują, że wzrasta produkcja tzw. hormonów szczęścia – endorfin. Powstają one w przysadce mózgowej. To właśnie one odpowiadają za radość i szeroki uśmiech, który widać na twarzach sportowców nawet po wyczerpujących zawodach lub treningach.",

    "Aktywność fizyczna zwiększa zdolności uczenia się. Jednym z powodów, dla których warto uprawiać sport, jest jego wpływ na układ nerwowy. Mózg jest nie tylko lepiej ukrwiony i odżywiony. Aktywność fizyczna powoduje, że wzrasta ekspresja białka BDNF, który reguluje działanie neuroprzekaźników i wzmacnia odbiór sygnałów między komórkami nerwowymi.",

    "Uprawianie sportu podnosi samoocenę. Wpływ uprawiania sportu na samoocenę jest związany nie tylko w poprawą wyglądu sylwetki. Dzięki niemu wzrasta wiara we własne możliwości, poprawia się nastrój i samopoczucie, tym samym patrzymy na siebie bardziej przychylnym okiem.",

    "Aktywność fizyczna zwiększa sprawność mózgu. Sport zwiększa ekspresję białek odpowiedzialnych za funkcjonowanie układu nerwowego – głównie tkanki nerwowej w mózgu. Sprzyja także namnażaniu się komórek nerwowych, co ma wpływ na funkcje poznawcze",

    "Aktywność fizyczna redukuje stres. Za stres odpowiedzialny jest kortyzol. Regularna, umiarkowana aktywność fizyczna zmniejsza jego wydzielanie. Tym samym zmniejsza się napięcie nerwowe. Stajemy się też bardziej odporni na sytuacje stresowe w przyszłości."
];

export const getRandomFunFact = () => {
    const randomNumber = Math.floor(Math.random() * funFacts.length);
    console.log(funFacts[randomNumber]);
    return funFacts[randomNumber];
};