import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
import './form.css';

export default class FormUsuario extends Component {
    constructor(props) {
        super(props);

        this.backendUrl = 'http://localhost:7000/usuarios';

        this.baseState = {
            nome: '',
            telefone: '',
            whatsApp: '',
            whats: [
                { value: 's', label: ' Sim ' },
                { value: 'n', label: ' Não ' },
            ],
            marca: '',
            modelo: '',
            ano: '',
            placa: '',
            dia: '',
            horario:'',
            minutos:'',
            contexto: {}
        }
        this.state = this.baseState;

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeTelefone = this.onChangeTelefone.bind(this);
        this.onChangeWhatsApp = this.onChangeWhatsApp.bind(this);
        this.onChangeMarca = this.onChangeMarca.bind(this);
        this.onChangeModelo = this.onChangeModelo.bind(this);
        this.onChangeAno = this.onChangeAno.bind(this);
        this.onChangePlaca = this.onChangePlaca.bind(this);
        this.onChangeDia = this.onChangeDia.bind(this);
        this.onChangeHorario = this.onChangeHorario.bind(this);
        this.onChangeMinutos = this.onChangeMinutos.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
    }//fim do construtor

    onChangeNome(e) {
        this.setState({ nome: e.target.value })
    }

    onChangeTelefone(e) {
        this.setState({ telefone: e.target.value })
    }

    onChangeWhatsApp(e) {
        this.setState({ whatsApp: e.target.value })
    }
    onChangeMarca(e) {
        this.setState({ marca: e.target.value })
    }

    onChangeModelo(e) {
        this.setState({ modelo: e.target.value })
    }

    onChangeAno(e) {
        this.setState({ ano: e.target.value })
    }
    onChangePlaca(e) {
        this.setState({ placa: e.target.value })
    }

    onChangeDia(e) {
        this.setState({ dia: e.target.value })
    }

    onChangeHorario(e) {
        this.setState({ horario: e.target.value })
    }

    onChangeMinutos(e) {
        this.setState({ minutos: e.target.value })
    }

    onReset(e) {
        this.setState(this.baseState);
    }

    onSubmit(e) {
        e.preventDefault();//inibe ação padrão

        const usuario = {
            nome: this.state.nome,
            telefone: this.state.telefone,
            whatsApp: this.state.whatsApp,
            marca: this.state.marca,
            modelo: this.state.modelo,
            ano: this.state.ano,
            placa: this.state.placa,
            dia: this.state.dia,
            horario: this.state.horario,
            minutos: this.state.minutos
        }; // fim do const usuario

        axios.post(this.backendUrl, usuario)
            .then(res => this.setState({ contexto: res.data }))//sucesso
            .catch(erro => this.setState({ contexto: erro.response.data }));//erro

        this.setState(this.baseState);
    } // fim do onSubmit()

    render() {

        const contexto = this.state.contexto;
        let erros = [];
        if (contexto.erros) {
            erros = contexto.erros.map(
                (erro, idx) => (<li key={idx}>{erro.msg}</li>));
        }
        
        let usuario = [];
        if (contexto.usuario) {
            usuario = [
                (<li key='1'>
                    <b>Nome:</b> {contexto.usuario.nome}
                </li>),
                (<li key='2'>
                    <b>Telefone:</b> {contexto.usuario.telefone}
                </li>),
                (<li key='3'>
                    <b>Possui WhatsApp</b> {contexto.usuario.whatsApp}
                </li>),
                (<li key='4'>
                    <b>Marca do veículo:</b> {contexto.usuario.marca}
                </li>),
                (<li key='5'>
                    <b>Modelo:</b> {contexto.usuario.modelo}
                </li>),
                (<li key='6'>
                    <b>Ano:</b> {contexto.usuario.ano}
                </li>),
                (<li key='7'>
                    <b>Placa:</b> {contexto.usuario.placa}
                </li>),
                (<li key='8'>
                    <b>Data:</b> {contexto.usuario.dia}
                </li>),
                (<li key='9'>
                    <b>Horario:</b> {contexto.usuario.horario}
                </li>),
                (<li key='10'>
                <b>Minutos:</b> {contexto.usuario.minutos}
                </li>)
            ]
        } // fim do if (contexto.usuario)   
        
        return (
            <>
                <Container>
                    <Jumbotron fluid>
                        <Container>
                            <h1 className="display-3">Lavação Duplo V</h1>
                            <h4>Bem-Vindo(a)!</h4><br/>
                            <p>Trabalhamos com Agendamento <b>a cada 30 minutos.</b><br/><br/>
                            Horário de funcionamento: <br/>
                            <b>Segunda-feira a Sexta-feira</b><br/>
                            <b>08:00 às 18:00</b><br/></p>
                        </Container>
                    </Jumbotron>                
                <hr/> 
                <h2>Dados do cliente</h2>
                <Form onSubmit={this.onSubmit}>                        
                    <Row form>
                        <Col md={8}>
                            <FormGroup>
                                <Label>Nome completo</Label>
                                <Input required type="text" value={this.state.nome}
                                onChange={this.onChangeNome}/>
                                <h3>*Campo Obrigatório</h3>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label>Telefone (opcional)</Label>
                                <Input 
                                type="number" 
                                min="0" 
                                placeholder="(xx) 9xxxx-xxxx"
                                value={this.state.telefone}
                                onChange={this.onChangeTelefone}/>
                                WhatsApp: &nbsp;  
                                {this.state.whats.map((obj, idx) => {
                                    return (<React.Fragment key={idx}>
                                        <input type="radio" name="whats"
                                            checked={this.state.whatsApp === obj.value}
                                            value={obj.value}
                                            onChange={this.onChangeWhatsApp} />
                                        {obj.label}
                                    </React.Fragment>);
                                 })}
                            </FormGroup>
                        </Col>
                    </Row>

                    <hr/> 
                    <h2>Dados do Veículo</h2>                    
                    <Row form>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Marca</Label>
                                <Input type="text" required value={this.state.marca}
                                onChange={this.onChangeMarca}/>
                                <h3>*Campo Obrigatório</h3>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Modelo</Label>
                                <Input type="text" required value={this.state.modelo}
                                onChange={this.onChangeModelo}/>
                                <h3>*Campo Obrigatório</h3>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Ano</Label>
                                <Input type="number" min="1900" max="2021" value={this.state.ano}
                                onChange={this.onChangeAno}/>
                                
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Placa</Label>
                                <Input type="text" required value={this.state.placa}
                                onChange={this.onChangePlaca}/>
                                <h3>*Campo Obrigatório</h3>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr/>   
                    <h2>Agendamento</h2>    

                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label>Data</Label>
                                <Input type="date" required value={this.state.dia}
                                onChange={this.onChangeDia}/>
                                <h3>*Campo Obrigatório</h3>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label>Hora</Label>
                                <Input type="number" required min="8" max="17" value={this.state.horario}
                                onChange={this.onChangeHorario}/>
                                <h3>*Campos</h3>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label>Minutos</Label>
                                <Input type="number" required min="0" max="30" value={this.state.minutos}
                                onChange={this.onChangeMinutos}/>
                                <h3>*Obrigatórios</h3>
                            </FormGroup>
                        </Col>                                                                       
                    </Row>

                    {contexto.erros && <ul>{erros}</ul>}

                        <hr/>
                        <Button color="primary" size="lg" block type="submit" value="Enviar">Enviar</Button><br></br>                        
                        <Button outline color="primary" value="Limpar" block
                            onClick={this.onReset}>Limpar</Button><br></br>        
                </Form>
                </Container>  

                <h7>Seus Dados:</h7><br/><br/>
                {contexto.usuario && <ul>{usuario}</ul>}

            </>
        ); // fim do return
    } // fim do render()

}// fim da classe FormUsuario