import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { api_key } from '../../api_key';
// import { ShoppingListContext } from '../ShoppingListProvider';
import { Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './RecipeDetails.css';
import cartPlusFill from '../../images/cart-plus-fill.svg';
import check2 from '../../images/check2.svg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ExternalRecipes() {
  const params = useParams();
  const [recipe, setRecipe] = useState('');
  //   const { shoppingList, addToShoppingList } = useContext(
  //     ShoppingListContext
  //   );
  const [isButtonClicked, setIsButtonClicked] = useState({});

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': api_key,
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  };

  useEffect(() => {
    if (!params.id) return null;
    fetch(
      `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${params.id}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        console.log('data from recipe details:', data);
      });
  }, []);

  if (!recipe) {
    return <>loading...</>;
  }

  return (
    <div>
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          'max-width': '100vw',
          marginBottom: '70px',
        }}
      >
        <Card style={{ width: '100vw', height: '800px' }}>
          <Row
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Col sm={6} md={8} style={{ flex: 1.3 }}>
              <Card.Body
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  flexDirection: 'column',
                }}
              >
                <Card.Title style={{ textAlign: 'center' }}>
                  <h1 className="recipeTitle">{recipe.name}</h1>
                </Card.Title>
                <Card.Text style={{ textAlign: 'center' }}>
                  {recipe.description}
                  <p className="cookTime">
                    Cook Time: {recipe.total_time_minutes} minutes
                  </p>
                  <p className="serving">
                    Servings: {recipe.num_servings}
                  </p>
                  {recipe.credits &&
                    recipe.credits.map((credit) => (
                      <p> by: {credit.name}</p>
                    ))}
                </Card.Text>
              </Card.Body>
            </Col>
            <Col sm={6} md={16} style={{ flex: 1 }}>
              <Card.Img
                variant="top"
                src={recipe.thumbnail_url}
                style={{ width: '100%', height: '800px' }}
              />
            </Col>
          </Row>
        </Card>
      </Container>
      <Container style={{ marginBottom: '70px' }}>
        <Row>
          <Col
            className="instructions"
            sm={6}
            md={8}
            style={{ flex: 1.5 }}
          >
            <p className="display-5">Instructions:</p>
            <ol>
              {recipe.instructions.map((instruction) => (
                <li
                  className="instructions"
                  key={instruction.display_text}
                >
                  <span>{instruction.display_text}</span>
                </li>
              ))}
            </ol>
            <table>
              <thead>
                <tr>
                  <th className="display-6">Nutrition Facts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Calories</td>
                  <td>{recipe.nutrition.calories}</td>
                </tr>
                <tr>
                  <td>Carbohydrates</td>
                  <td>{recipe.nutrition.carbohydrates} grams</td>
                </tr>
                <tr>
                  <td>Fat</td>
                  <td>{recipe.nutrition.fat} grams</td>
                </tr>
                <tr>
                  <td>Fiber</td>
                  <td>{recipe.nutrition.fiber} grams</td>
                </tr>
                <tr>
                  <td>Sugar</td>
                  <td>{recipe.nutrition.sugar} grams</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col sm={6} md={16} style={{ flex: 1 }}>
            <p className="display-5" style={{ padding: '18px' }}>
              Ingredients:
            </p>
            <ul>
              {recipe.sections.map((section) => {
                return (
                  <>
                    {section.components.map((component) => (
                      <>
                        <div
                          style={{ display: 'flex', padding: '8px' }}
                        >
                          <OverlayTrigger
                            key={component}
                            overlay={<Tooltip>Add to cart</Tooltip>}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <img
                                src={cartPlusFill}
                                alt="shopping cart with plus in the center"
                                // onClick={() => {
                                //   addToShoppingList(
                                //     component.raw_text
                                //   );
                                //   localStorage.setItem(
                                //     'shoppingList',
                                //     JSON.stringify(shoppingList)
                                //   );
                                //   setIsButtonClicked({
                                //     ...isButtonClicked,
                                //     [component.raw_text]:
                                //       !isButtonClicked[
                                //         component.raw_text
                                //       ],
                                //   });
                                // }}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  cursor: 'pointer',
                                  filter: isButtonClicked[
                                    component.raw_text
                                  ]
                                    ? 'invert(33%) sepia(77%) saturate(1726%) hue-rotate(96deg) brightness(111%) contrast(115%)'
                                    : 'none',
                                }}
                              />
                            </div>
                          </OverlayTrigger>

                          <p style={{ margin: '10px' }}>
                            {component.raw_text}
                          </p>
                        </div>
                      </>
                    ))}
                  </>
                );
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ExternalRecipes;
