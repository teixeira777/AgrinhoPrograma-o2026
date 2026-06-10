function openTool(toolName) {
    const modal = document.getElementById('toolModal');
    const toolContent = document.getElementById('toolContent');
    
    let content = '';
    
    switch(toolName) {
        case 'produtividade':
            content = createProdutividadeTool();
            break;
        case 'credito':
            content = createCreditoTool();
            break;
        case 'praticas':
            content = createPraticasTool();
            break;
        case 'carbono':
            content = createCarbonoTool();
            break;
        case 'diagnostico':
            content = createDiagnosticoTool();
            break;
        case 'planejador':
            content = createPlanejadorTool();
            break;
        default:
            content = '<p>Ferramenta não encontrada</p>';
    }
    
    toolContent.innerHTML = content;
    modal.style.display = 'block';
}

function closeTool() {
    const modal = document.getElementById('toolModal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('toolModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// ===== CALCULADORA DE PRODUTIVIDADE =====
function createProdutividadeTool() {
    return `
        <h2>Calculadora de Produtividade</h2>
        <p>Estime sua produtividade com base em práticas sustentáveis adotadas.</p>
        
        <form class="tool-form" onsubmit="calcularProdutividade(event)">
            <div class="form-group">
                <label for="areaProdutiva">Área Produtiva (hectares)</label>
                <input type="number" id="areaProdutiva" min="1" step="0.1" required>
                <small>Informe a área total de sua propriedade em hectares</small>
            </div>
            
            <div class="form-group">
                <label for="praticasAdotadas">Número de Práticas Sustentáveis Adotadas</label>
                <select id="praticasAdotadas" required>
                    <option value="">Selecione</option>
                    <option value="1">1 prática</option>
                    <option value="2">2 práticas</option>
                    <option value="3">3 práticas</option>
                    <option value="4">4 ou mais práticas</option>
                </select>
                <small>Rotação de culturas, plantio direto, ILPF, controle biológico, etc.</small>
            </div>
            
            <div class="form-group">
                <label for="tipoProducao">Tipo de Produção</label>
                <select id="tipoProducao" required>
                    <option value="">Selecione</option>
                    <option value="soja">Soja</option>
                    <option value="milho">Milho</option>
                    <option value="arroz">Arroz</option>
                    <option value="pecuaria">Pecuária</option>
                    <option value="mista">Produção Mista</option>
                </select>
            </div>
            
            <div class="form-buttons">
                <button type="submit" class="btn-primary">Calcular</button>
                <button type="reset" class="btn-secondary">Limpar</button>
            </div>
        </form>
        
        <div id="produtividadeResult"></div>
    `;
}

function calcularProdutividade(event) {
    event.preventDefault();
    
    const area = parseFloat(document.getElementById('areaProdutiva').value);
    const praticas = parseInt(document.getElementById('praticasAdotadas').value);
    const producao = document.getElementById('tipoProducao').value;
    
    const produtividadeBase = {
        'soja': 3.5,
        'milho': 5.5,
        'arroz': 4.0,
        'pecuaria': 2.0,
        'mista': 3.5
    };
    
    const bonusPraticas = {
        1: 1.05,
        2: 1.10,
        3: 1.15,
        4: 1.20
    };
    
    const prodBase = produtividadeBase[producao];
    const bonus = bonusPraticas[praticas];
    const produtividadeEstimada = prodBase * bonus;
    const producaoTotal = area * produtividadeEstimada;
    
    const resultDiv = document.getElementById('produtividadeResult');
    resultDiv.innerHTML = `
        <div class="result-box">
            <h4>Resultado da Estimativa</h4>
            <div class="result-item">
                <span class="result-label">Produtividade Base:</span>
                <span class="result-value">${prodBase.toFixed(2)} t/ha</span>
            </div>
            <div class="result-item">
                <span class="result-label">Bônus por Práticas:</span>
                <span class="result-value">+${((bonus - 1) * 100).toFixed(1)}%</span>
            </div>
            <div class="result-item">
                <span class="result-label">Produtividade Estimada:</span>
                <span class="result-value">${produtividadeEstimada.toFixed(2)} t/ha</span>
            </div>
            <div class="result-item">
                <span class="result-label">Produção Total Estimada:</span>
                <span class="result-value">${producaoTotal.toFixed(2)} toneladas</span>
            </div>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
                <strong>Dica:</strong> Quanto mais práticas sustentáveis você adota, maior é o potencial de produtividade!
            </p>
        </div>
    `;
}

// ===== SIMULADOR DE CRÉDITO ABC+ =====
function createCreditoTool() {
    return `
        <h2>Simulador de Crédito ABC+</h2>
        <p>Simule o financiamento para práticas de agricultura de baixo carbono.</p>
        
        <form class="tool-form" onsubmit="simularCredito(event)">
            <div class="form-group">
                <label for="valorProjeto">Valor do Projeto (R$)</label>
                <input type="number" id="valorProjeto" min="1000" step="100" required>
                <small>Investimento total em práticas sustentáveis</small>
            </div>
            
            <div class="form-group">
                <label for="praticaABC">Prática ABC+ Escolhida</label>
                <select id="praticaABC" required>
                    <option value="">Selecione</option>
                    <option value="plantio">Plantio Direto</option>
                    <option value="ilpf">Integração Lavoura-Pecuária-Floresta</option>
                    <option value="recuperacao">Recuperação de Pastagens</option>
                    <option value="fixacao">Fixação Biológica de Nitrogênio</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="taxaJuro">Taxa de Juros Anual (%)</label>
                <input type="number" id="taxaJuro" min="0" max="20" step="0.1" value="6.5" required>
                <small>Taxa média do Plano ABC+ (6,5% a.a.)</small>
            </div>
            
            <div class="form-group">
                <label for="prazoFinanciamento">Prazo de Financiamento (anos)</label>
                <select id="prazoFinanciamento" required>
                    <option value="5">5 anos</option>
                    <option value="10">10 anos</option>
                    <option value="15">15 anos</option>
                </select>
            </div>
            
            <div class="form-buttons">
                <button type="submit" class="btn-primary">Simular</button>
                <button type="reset" class="btn-secondary">Limpar</button>
            </div>
        </form>
        
        <div id="creditoResult"></div>
    `;
}

function simularCredito(event) {
    event.preventDefault();
    
    const valor = parseFloat(document.getElementById('valorProjeto').value);
    const taxa = parseFloat(document.getElementById('taxaJuro').value) / 100 / 12;
    const prazo = parseInt(document.getElementById('prazoFinanciamento').value) * 12;
    
    const parcela = valor * (taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
    const totalPago = parcela * prazo;
    const jurosTotal = totalPago - valor;
    
    const resultDiv = document.getElementById('creditoResult');
    resultDiv.innerHTML = `
        <div class="result-box">
            <h4>Simulação de Crédito ABC+</h4>
            <div class="result-item">
                <span class="result-label">Valor Financiado:</span>
                <span class="result-value">R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Parcela Mensal:</span>
                <span class="result-value">R$ ${parcela.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total de Juros:</span>
                <span class="result-value">R$ ${jurosTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total a Pagar:</span>
                <span class="result-value">R$ ${totalPago.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
            </div>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
                <strong>Benefício:</strong> O Plano ABC+ oferece subsídios que podem reduzir ainda mais a taxa de juros!
            </p>
        </div>
    `;
}

// ===== RECOMENDADOR DE PRÁTICAS =====
function createPraticasTool() {
    return `
        <h2>Recomendador de Práticas Sustentáveis</h2>
        <p>Receba recomendações personalizadas baseadas no seu perfil.</p>
        
        <form class="tool-form" onsubmit="recomendarPraticas(event)">
            <div class="form-group">
                <label for="tipoPropriedade">Tipo de Propriedade</label>
                <select id="tipoPropriedade" required>
                    <option value="">Selecione</option>
                    <option value="pequena">Pequena (até 50 ha)</option>
                    <option value="media">Média (50-500 ha)</option>
                    <option value="grande">Grande (acima de 500 ha)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="producaoPrincipal">Produção Principal</label>
                <select id="producaoPrincipal" required>
                    <option value="">Selecione</option>
                    <option value="graos">Grãos (Soja, Milho, Arroz)</option>
                    <option value="pecuaria">Pecuária</option>
                    <option value="mista">Produção Mista</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="desafiosPrincipais">Principal Desafio</label>
                <select id="desafiosPrincipais" required>
                    <option value="">Selecione</option>
                    <option value="erosao">Erosão do Solo</option>
                    <option value="agua">Conservação de Água</option>
                    <option value="carbono">Redução de Carbono</option>
                    <option value="produtividade">Aumento de Produtividade</option>
                </select>
            </div>
            
            <div class="form-buttons">
                <button type="submit" class="btn-primary">Obter Recomendações</button>
                <button type="reset" class="btn-secondary">Limpar</button>
            </div>
        </form>
        
        <div id="praticasResult"></div>
    `;
}

function recomendarPraticas(event) {
    event.preventDefault();
    
    const desafio = document.getElementById('desafiosPrincipais').value;
    
    const recomendacoes = {
        'erosao': [
            'Plantio Direto - Mantém a cobertura do solo',
            'Terraceamento - Reduz a velocidade da água',
            'Rotação de Culturas - Melhora a estrutura do solo'
        ],
        'agua': [
            'Integração Lavoura-Pecuária-Floresta - Melhora infiltração',
            'Plantio Direto - Aumenta retenção de água',
            'Manejo de Pastagens - Reduz compactação'
        ],
        'carbono': [
            'Integração Lavoura-Pecuária-Floresta - Sequestra carbono',
            'Fixação Biológica de Nitrogênio - Reduz emissões',
            'Recuperação de Pastagens - Aumenta biomassa'
        ],
        'produtividade': [
            'Manejo Integrado de Pragas - Reduz perdas',
            'Rotação de Culturas - Melhora fertilidade',
            'Bioinsumos - Aumenta eficiência nutricional'
        ]
    };
    
    const praticas = recomendacoes[desafio] || [];
    
    const resultDiv = document.getElementById('praticasResult');
    let html = '<div class="result-box"><h4>Recomendações Personalizadas</h4>';
    
    praticas.forEach((pratica, index) => {
        const parts = pratica.split(' - ');
        html += `<div style="margin: 1rem 0; padding: 0.8rem; background-color: #f9f9f9; border-radius: 5px;">
            <strong style="color: #2d5016;">${index + 1}. ${parts[0]}</strong>
            <p style="margin-top: 0.3rem; color: #666; font-size: 0.9rem;">${parts[1]}</p>
        </div>`;
    });
    
    html += '<p style="margin-top: 1rem; font-size: 0.9rem; color: #666;"><strong>Próximo Passo:</strong> Consulte um agrônomo para implementar essas práticas!</p></div>';
    
    resultDiv.innerHTML = html;
}

// ===== CALCULADORA DE CARBONO =====
function createCarbonoTool() {
    return `
        <h2>Calculadora de Sequestro de Carbono</h2>
        <p>Estime quanto carbono sua propriedade pode sequestrar com práticas sustentáveis.</p>
        
        <form class="tool-form" onsubmit="calcularCarbono(event)">
            <div class="form-group">
                <label for="areaILPF">Área com ILPF (hectares)</label>
                <input type="number" id="areaILPF" min="0" step="0.1" value="0" required>
                <small>Área com Integração Lavoura-Pecuária-Floresta</small>
            </div>
            
            <div class="form-group">
                <label for="areaPastagem">Área de Pastagem Recuperada (hectares)</label>
                <input type="number" id="areaPastagem" min="0" step="0.1" value="0" required>
                <small>Área de pastagem degradada que foi recuperada</small>
            </div>
            
            <div class="form-group">
                <label for="areaPlantio">Área com Plantio Direto (hectares)</label>
                <input type="number" id="areaPlantio" min="0" step="0.1" value="0" required>
                <small>Área sob plantio direto</small>
            </div>
            
            <div class="form-buttons">
                <button type="submit" class="btn-primary">Calcular</button>
                <button type="reset" class="btn-secondary">Limpar</button>
            </div>
        </form>
        
        <div id="carbonoResult"></div>
    `;
}

function calcularCarbono(event) {
    event.preventDefault();
    
    const ilpf = parseFloat(document.getElementById('areaILPF').value);
    const pastagem = parseFloat(document.getElementById('areaPastagem').value);
    const plantio = parseFloat(document.getElementById('areaPlantio').value);
    
    const sequestroPorHa = {
        ilpf: 15,
        pastagem: 8,
        plantio: 0.5
    };
    
    const totalILPF = ilpf * sequestroPorHa.ilpf;
    const totalPastagem = pastagem * sequestroPorHa.pastagem;
    const totalPlantio = plantio * sequestroPorHa.plantio;
    const totalAnual = totalILPF + totalPastagem + totalPlantio;
    const total10Anos = totalAnual * 10;
    
    const resultDiv = document.getElementById('carbonoResult');
    resultDiv.innerHTML = `
        <div class="result-box">
            <h4>Sequestro de Carbono Estimado</h4>
            <div class="result-item">
                <span class="result-label">ILPF (${ilpf} ha):</span>
                <span class="result-value">${totalILPF.toFixed(2)} t CO2eq/ano</span>
            </div>
            <div class="result-item">
                <span class="result-label">Pastagem Recuperada (${pastagem} ha):</span>
                <span class="result-value">${totalPastagem.toFixed(2)} t CO2eq/ano</span>
            </div>
            <div class="result-item">
                <span class="result-label">Plantio Direto (${plantio} ha):</span>
                <span class="result-value">${totalPlantio.toFixed(2)} t CO2eq/ano</span>
            </div>
            <div class="result-item" style="border-top: 2px solid #7cb342; padding-top: 1rem; margin-top: 1rem;">
                <span class="result-label"><strong>Total Anual:</strong></span>
                <span class="result-value"><strong>${totalAnual.toFixed(2)} t CO2eq</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Total em 10 Anos:</span>
                <span class="result-value">${total10Anos.toFixed(2)} t CO2eq</span>
            </div>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
                <strong>Benefício:</strong> Você pode comercializar esses créditos de carbono no mercado voluntário!
            </p>
        </div>
    `;
}

// ===== DIAGNÓSTICO DE SUSTENTABILIDADE =====
function createDiagnosticoTool() {
    return `
        <h2>Diagnóstico de Sustentabilidade</h2>
        <p>Avalie o nível de sustentabilidade da sua propriedade.</p>
        
        <form class="tool-form" onsubmit="realizarDiagnostico(event)">
            <div class="form-group">
                <label>Marque as práticas que você já adota:</label>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="pratica" value="plantio"> Plantio Direto
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="pratica" value="rotacao"> Rotação de Culturas
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="pratica" value="ilpf"> Integração Lavoura-Pecuária-Floresta
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="pratica" value="biologico"> Controle Biológico
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="pratica" value="bioinsumos"> Bioinsumos
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="pratica" value="rastreabilidade"> Rastreabilidade
                </label>
            </div>
            
            <div class="form-buttons" style="margin-top: 1.5rem;">
                <button type="submit" class="btn-primary">Gerar Diagnóstico</button>
                <button type="reset" class="btn-secondary">Limpar</button>
            </div>
        </form>
        
        <div id="diagnosticoResult"></div>
    `;
}

function realizarDiagnostico(event) {
    event.preventDefault();
    
    const praticas = Array.from(document.querySelectorAll('input[name="pratica"]:checked')).map(el => el.value);
    const total = 6;
    const percentual = (praticas.length / total) * 100;
    
    let nivel = '';
    let cor = '';
    let recomendacao = '';
    
    if (percentual === 0) {
        nivel = 'Inicial';
        cor = '#e74c3c';
        recomendacao = 'Comece adotando práticas simples como rotação de culturas.';
    } else if (percentual <= 33) {
        nivel = 'Básico';
        cor = '#f39c12';
        recomendacao = 'Você está no caminho certo! Continue expandindo as práticas.';
    } else if (percentual <= 66) {
        nivel = 'Intermediário';
        cor = '#f1c40f';
        recomendacao = 'Bom progresso! Considere implementar as práticas faltantes.';
    } else if (percentual < 100) {
        nivel = 'Avançado';
        cor = '#2ecc71';
        recomendacao = 'Excelente! Você está muito próximo de uma propriedade totalmente sustentável.';
    } else {
        nivel = 'Excelente';
        cor = '#27ae60';
        recomendacao = 'Parabéns! Sua propriedade é um modelo de sustentabilidade!';
    }
    
    const resultDiv = document.getElementById('diagnosticoResult');
    resultDiv.innerHTML = `
        <div class="result-box" style="border-left-color: ${cor};">
            <h4>Resultado do Diagnóstico</h4>
            <div style="text-align: center; margin: 1.5rem 0;">
                <div style="font-size: 3rem; font-weight: bold; color: ${cor};">${percentual.toFixed(0)}%</div>
                <div style="font-size: 1.5rem; color: ${cor}; font-weight: bold;">${nivel}</div>
            </div>
            <div style="background-color: #f9f9f9; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
                <p style="color: #666;"><strong>Análise:</strong> Você está adotando ${praticas.length} de ${total} práticas sustentáveis.</p>
                <p style="color: #666; margin-top: 0.5rem;"><strong>Recomendação:</strong> ${recomendacao}</p>
            </div>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
                <strong>Próximo Passo:</strong> Consulte um técnico agrícola para um plano de implementação personalizado.
            </p>
        </div>
    `;
}

// ===== PLANEJADOR DE SAFRA =====
function createPlanejadorTool() {
    return `
        <h2>Planejador de Safra</h2>
        <p>Planeje sua próxima safra com recomendações baseadas em dados.</p>
        
        <form class="tool-form" onsubmit="planejarSafra(event)">
            <div class="form-group">
                <label for="safraAtual">Última Safra Realizada</label>
                <select id="safraAtual" required>
                    <option value="">Selecione</option>
                    <option value="soja">Soja</option>
                    <option value="milho">Milho</option>
                    <option value="arroz">Arroz</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="produtividadeUltima">Produtividade da Última Safra (t/ha)</label>
                <input type="number" id="produtividadeUltima" min="0" step="0.1" required>
            </div>
            
            <div class="form-group">
                <label for="safraProxima">Próxima Safra Planejada</label>
                <select id="safraProxima" required>
                    <option value="">Selecione</option>
                    <option value="soja">Soja</option>
                    <option value="milho">Milho</option>
                    <option value="arroz">Arroz</option>
                    <option value="rotacao">Rotação (Leguminosa)</option>
                </select>
            </div>
            
            <div class="form-buttons">
                <button type="submit" class="btn-primary">Gerar Plano</button>
                <button type="reset" class="btn-secondary">Limpar</button>
            </div>
        </form>
        
        <div id="planejadorResult"></div>
    `;
}

function planejarSafra(event) {
    event.preventDefault();
    
    const safraAtual = document.getElementById('safraAtual').value;
    const produtividade = parseFloat(document.getElementById('produtividadeUltima').value);
    const safraProxima = document.getElementById('safraProxima').value;
    
    const recomendacoes = {
        'soja-milho': 'Excelente! Milho após soja aproveita o nitrogênio residual. Considere plantio direto.',
        'milho-soja': 'Boa sequência! Soja após milho melhora a estrutura do solo. Use rotação de culturas.',
        'arroz-soja': 'Ótima combinação! Soja após arroz reduz pragas. Implemente ILPF se possível.',
        'soja-rotacao': 'Perfeito! Leguminosas fixam nitrogênio. Isso reduzirá custos com adubação.',
        'milho-rotacao': 'Excelente! Leguminosas melhoram a fertilidade do solo para próximas safras.',
        'arroz-rotacao': 'Bom planejamento! Rotação com leguminosas é fundamental para sustentabilidade.'
    };
    
    const chave = `${safraAtual}-${safraProxima}`;
    const recomendacao = recomendacoes[chave] || 'Consulte um agrônomo para orientações específicas.';
    
    const metaProutividade = produtividade * 1.1;
    
    const resultDiv = document.getElementById('planejadorResult');
    resultDiv.innerHTML = `
        <div class="result-box">
            <h4>Plano de Safra Recomendado</h4>
            <div class="result-item">
                <span class="result-label">Sequência de Culturas:</span>
                <span class="result-value">${safraAtual.toUpperCase()} → ${safraProxima.toUpperCase()}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Produtividade Anterior:</span>
                <span class="result-value">${produtividade.toFixed(2)} t/ha</span>
            </div>
            <div class="result-item">
                <span class="result-label">Meta de Produtividade:</span>
                <span class="result-value">${metaProutividade.toFixed(2)} t/ha (+10%)</span>
            </div>
            <div style="background-color: #f9f9f9; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
                <p style="color: #666;"><strong>Recomendação:</strong> ${recomendacao}</p>
            </div>
            <div style="background-color: #e8f5e9; padding: 1rem; border-radius: 5px; margin: 1rem 0; border-left: 4px solid #4caf50;">
                <p style="color: #2d5016; margin: 0;"><strong>Dicas para atingir a meta:</strong></p>
                <ul style="color: #666; margin: 0.5rem 0; padding-left: 1.5rem;">
                    <li>Implemente rotação de culturas</li>
                    <li>Use bioinsumos para maior eficiência</li>
                    <li>Monitore a umidade do solo</li>
                    <li>Adote manejo integrado de pragas</li>
                </ul>
            </div>
        </div>
    `;
}