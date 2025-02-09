import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { supabase } from "../supabaseClient";  // Adjust based on location

const CreditCardForm = ({ onSubmit }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pay Now button clicked"); // ✅ Debug log
    onSubmit(cardDetails); // Ensure this is correctly passed
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
    const cart = location.state?.cart || [];
  
    const sumTotal = () => {
      return cart
        .reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
        .toFixed(2);
    };
  
    const handlePayment = async (cardDetails) => {
      setIsProcessing(true);
      setError(null);
  
      try {
        // Create the transaction record with fixed values for credit_card_id and description
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert([
            {
              credit_card_id: 4, // Default to 1 as specified
              cc_number: cardDetails.number.replace(/\s/g, ''), // Remove spaces from card number
              transaction_amount: parseFloat(sumTotal()),
              description: 'Clothing' // Default description as specified
            }
          ]);
  
        if (transactionError) throw transactionError;
  
        setIsSuccess(true);
      } catch (err) {
        setError(err.message);
        console.error('Error processing payment:', err);
      } finally {
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
          {isProcessing ? (
            <ProcessingMessage>Processing payment...</ProcessingMessage>
          ) : (
            <CreditCardForm onSubmit={handlePayment} />
          )}
        </CheckoutCard>
      </Container>
    );
  };

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.6rem;
`;

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

// Function to test Supabase connection
const testSupabaseConnection = async () => {
    try {
        console.log("Testing Supabase connection...");
        
        const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .limit(5); // Fetch only 5 rows for testing

        if (error) {
            console.error("Supabase error:", error);
        } else {
            console.log("Supabase is connected! Retrieved transactions:", data);
        }
    } catch (err) {
        console.error("Unexpected error testing Supabase:", err);
    }
};

// Call the function when the component mounts
testSupabaseConnection();

export default Checkout;




// 7890456732451245 