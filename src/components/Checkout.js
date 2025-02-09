import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import cardAnimation from './cards.json';  // Make sure this path matches your file location

const CreditCardForm = ({ onSubmit }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cardDetails);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Card Number</Label>
        <Input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardDetails.number}
          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
          maxLength="19"
        />
      </FormGroup>
      <FormGroup>
        <Label>Cardholder Name</Label>
        <Input
          type="text"
          placeholder="John Doe"
          value={cardDetails.name}
          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
        />
      </FormGroup>
      <GridContainer>
        <FormGroup>
          <Label>Expiry Date</Label>
          <Input
            type="text"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            maxLength="5"
          />
        </FormGroup>
        <FormGroup>
          <Label>CVV</Label>
          <Input
            type="text"
            placeholder="123"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            maxLength="3"
          />
        </FormGroup>
      </GridContainer>
      <SubmitButton type="submit">Pay Now</SubmitButton>
    </Form>
  );
};

const Checkout = () => {
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const cart = location.state?.cart || [];

  const sumTotal = () => {
    return cart
      .reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
      .toFixed(2);
  };

  const handlePayment = async (cardDetails) => {
    setIsProcessing(true);
    setError(null);
    setShowAnimation(true);

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const response = await fetch('http://localhost:5003/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(sumTotal())
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment failed');
      }

      const data = await response.json();
      console.log('Transaction successful:', data);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
      console.error('Error processing payment:', err);
    } finally {
      setShowAnimation(false);
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <Container>
        <SuccessMessage>
          Payment successful! Thank you for your purchase.
        </SuccessMessage>
      </Container>
    );
  }

  return (
    <Container>
      <CheckoutCard>
        <Title>Checkout</Title>
        <TotalAmount>Total Amount: ${sumTotal()}</TotalAmount>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {showAnimation ? (
          <AnimationContainer>
            <Lottie
              animationData={cardAnimation}
              loop={true}
              autoplay={true}
              style={{ width: 200, height: 200 }}
            />
            <ProcessingMessage>Processing payment...</ProcessingMessage>
          </AnimationContainer>
        ) : (
          <CreditCardForm onSubmit={handlePayment} />
        )}
      </CheckoutCard>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
`;

const CheckoutCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 20px;
`;

const TotalAmount = styled.p`
  font-size: 1.8rem;
  color: #666;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.6rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 4px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

const ProcessingMessage = styled.div`
  text-align: center;
  font-size: 1.8rem;
  padding: 20px;
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  font-size: 1.8rem;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.6rem;
`;

export default Checkout;