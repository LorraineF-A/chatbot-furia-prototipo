import calendario from '../data/calendario';

// Simula uma API com delay de 1.5s
export const fetchProximosJogos = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(calendario);
        }, 1500); 
    });
};