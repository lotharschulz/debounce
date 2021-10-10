import './App.css';
import Elements from "./UIElements";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

function App() {
  return (
    <div className="App">
      <Container className="container" maxWidth="sm">
        <Card>
          <CardContent>
            <Elements />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;
