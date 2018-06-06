import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect, withRouter } from 'react-router'

class Login extends Component {
  constructor (props) {
    super(props);
    this.setRedirect = this.setRedirect.bind(this);
    this.state = {};
  }
  state = {
    redirect: false
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect from='/login' to='/'/>
    }
  }
  render() {
    const { redirect } = this.state;

    if (redirect) {
       return <Redirect to='/home'/>;
     }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="Username" placeholder="Username" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="Password" placeholder="Password" />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        {this.renderRedirect()}
                        <Button color="primary" className="px-4" onClick={this.setRedirect} changeRoute={this.props.history.pushState}> Login </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  setRedirect = () => {
    this.setState({redirect:true});
    var input1 = document.getElementById('Username');
    var input2 = document.getElementById('Password');
    if (input1!=null && input2!=null) {
      var user = {"korisnik" : input1.value, "sifra" : input2.value};
      var ajax = new XMLHttpRequest();
      var response = 0;
      ajax.onreadystatechange = () => {// Anonimna funkcija
          if (ajax.readyState == 4 && ajax.status == 200){
             this.setState({ redirect: true });
              alert("Uspješan login!");
          }
              
          else if (ajax.readyState == 4)
          console.log(ajax.status,ajax.responseText);
        };
      ajax.open("POST","http://localhost:8080/api/login/",true);
      ajax.setRequestHeader("Content-Type", "application/json");
      ajax.send(JSON.stringify(user));
    }
  }
}

export default Login;

