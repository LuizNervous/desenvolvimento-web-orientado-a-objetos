class Voo {
    // O constructor define como o objeto nasce
    constructor(codigo, origem, destino, horario) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.horario = horario;
        this.status = "No Pátio"; // Status inicial padrão
    }

    // Método para atualizar o que o usuário vê na tela
    atualizarStatus() {
        document.getElementById('display-codigo').innerText = this.codigo;
        document.getElementById('display-rota').innerText = `${this.origem} -> ${this.destino}`;
        document.getElementById('display-horario').innerText = this.horario;
        
        const statusEl = document.getElementById('display-status');
        statusEl.innerText = this.status;

        // Estética: muda a cor do texto baseado no status
        statusEl.style.color = (this.status === "Em Voo") ? "green" : "red";
    } atrasar() {
        // 1. Pegamos o horário atual (ex: "14:30") e dividimos em hora e minuto
        let [hora, minuto] = this.horario.split(':').map(Number);

        // 2. Adicionamos 30 minutos
        minuto += 30;

        // 3. Se os minutos passarem de 60, ajustamos a hora
        if (minuto >= 60) {
            minuto -= 60;
            hora += 1;
        }

        // 4. Formatamos de volta para string (ex: "15:00")
        // O padStart serve para garantir que 15:5 vire 15:05
        const novaHora = String(hora).padStart(2, '0');
        const novoMinuto = String(minuto).padStart(2, '0');

        // 5. ATUALIZAMOS OS ATRIBUTOS DO OBJETO USANDO 'THIS'
        this.horario = `${novaHora}:${novoMinuto}`;
        this.status = "Atrasado";

        // 6. Chamamos o método que já criamos para atualizar a tela
        this.atualizarStatus();
        
        // Feedback visual extra (opcional): mudar a cor do horário para vermelho
        document.getElementById('display-horario').style.color = "red";
    }

    decolar() {
        this.status = "Em Voo";
        this.atualizarStatus();
        // Move o avião visualmente
        document.getElementById('aviao').style.transform = "translate(250px, -50px) rotate(-10deg)";
          document.getElementById('display-horario').style.color = "black";
    }

    pousar() {
        this.status = "Finalizado / No Solo";
        this.atualizarStatus();
        // Reseta o avião visualmente
        const statusEl = document.getElementById('display-status');
        statusEl.innerText = this.status;

        // Estética: muda a cor do texto baseado no status
        statusEl.style.color = "green";
        document.getElementById('aviao').style.transform = "translate(300px, 0px) rotate(0deg)";
        document.getElementById('display-horario').style.color = "#ba8e23";
    }
}

// --- INSTANCIANDO O OBJETO ---
// Aqui criamos um voo real baseado na classe (a planta)
const meuVoo = new Voo("AD123", "São Paulo (GRU)", "Lisboa (LIS)", "14:30");

// Exibe os dados iniciais na tela assim que carrega
meuVoo.atualizarStatus();

// --- FUNÇÕES DE CONTROLE (DOM) ---
// Funções que os botões do HTML chamam
function controladorDecolar() {
    meuVoo.decolar();
}
function controladorAtrasar() {
    meuVoo.atrasar();
}
function controladorPousar() {
    meuVoo.pousar();
}