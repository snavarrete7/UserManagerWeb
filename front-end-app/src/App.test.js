import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import CustomerForm from './components/CustomerForm';
import { MemoryRouter } from 'react-router-dom';
import CustomerList from './components/CustomerList';

const mockCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: "securepass456"
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    password: "alicepass789"
  }]


test('Renders the App', () => {
  render(<App />);
  const linkElement = screen.getByText(/User Management/i);
  expect(linkElement).toBeInTheDocument();
})

test('Customers loaded', () =>{
  render(<App/>)
  const numberCustomers = screen.getByText(/Number of customers: 0/i);
  expect(numberCustomers).toBeInTheDocument();
})

test('Elements rendered in the app ', () => {
  render(<App/>)
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Add/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();

})


test('Renders inputs for name, email, and password', () => {
  // Renderizar el componente
  render(
  <MemoryRouter>
    <CustomerForm 
      customerNameForm="" 
      customerEmailForm="" 
      customerPassForm="" 
      handleChangeNameForm={() => {}} 
      handleChangeEmailForm={() => {}} 
      handleChangePassForm={() => {}} 
  /></MemoryRouter>);

  // Buscar el input de nombre por su atributo name
  const nameInput = screen.getByText(/name/i)
  
  // Buscar el input de email por su atributo name
  const emailInput = screen.getByText(/email/i)

  // Buscar el input de password por su atributo name (input de texto, no de tipo password)
  const passwordInput = screen.getByText(/password/i)
  // Verificar que todos los inputs están en el documento
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});


test("User info rendered in the form when a user is selected", () =>{
  render(
    <MemoryRouter>
    <CustomerForm
      customerIdForm="1" // Empty to simulate adding a new customer
      customerNameForm="Mock"
      customerEmailForm="mock@mock.com"
      customerPassForm="mockmock"
      formMode="Update"
      handleChangeNameForm={() => {}} // Mock handleChangeNameForm
      handleChangeEmailForm={() => {}} // Mock handleChangeEmailForm
      handleChangePassForm={() => {}} // Mock handleChangePassForm
      clickSave={() => {}} // Mock the clickSave function
      clickDelete={() => {}}
      clickCancel={() => {}}
    /></MemoryRouter>
  );

  expect(screen.getByDisplayValue(/Mock/)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/mock@mock.com/)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/mockmock/)).toBeInTheDocument();

})

test("User info rendered in the form when is typed", () => {

  const mockHandleChangeNameForm = jest.fn();
  const mockHandleChangeEmailForm = jest.fn();
  const mockHandleChangePassForm = jest.fn();


  render(
    <MemoryRouter>
    <CustomerForm
      customerIdForm="Mock" // Empty to simulate adding a new customer
      customerNameForm="Mock"
      customerEmailForm="mock@mock.com"
      customerPassForm="mockPassword"
      formMode="Update"
      handleChangeNameForm={() => {}} // Mock handleChangeNameForm
      handleChangeEmailForm={() => {}} // Mock handleChangeEmailForm
      handleChangePassForm={() => {}} // Mock handleChangePassForm
      clickSave={() => {}} // Mock the clickSave function
      clickDelete={() => {}}
      clickCancel={() => {}}
    /></MemoryRouter>
  );

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  // Simulamos el cambio de valores en los campos de input
  userEvent.type(nameInput, { target: { value: 'Mock' } });
  fireEvent.change(emailInput, { target: { value: 'mock@mock.com' } });
  fireEvent.change(passwordInput, { target: { value: 'mockPassword' } });

 expect(nameInput.value).toBe("Mock")
 expect(emailInput.value).toBe("mock@mock.com")
 expect(passwordInput.value).toBe("mockPassword")


})

const mockClickSave = jest.fn();
const mockClickDelete = jest.fn();
const mockClickCancel = jest.fn();

test('Should add a new customer when the form is submitted', () => {
  // Render the CustomerForm component with required props
  render(
    <MemoryRouter>
    <CustomerForm
      customerIdForm="" // Empty to simulate adding a new customer
      customerNameForm=""
      customerEmailForm=""
      customerPassForm=""
      formMode="Add"
      handleChangeNameForm={() => {}} // Mock handleChangeNameForm
      handleChangeEmailForm={() => {}} // Mock handleChangeEmailForm
      handleChangePassForm={() => {}} // Mock handleChangePassForm
      clickSave={mockClickSave} // Mock the clickSave function
      clickDelete={() => {}}
      clickCancel={() => {}}
    /></MemoryRouter>
  );

  // Find the inputs for name, email, and password
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  // Simulate user typing in the form
  fireEvent.change(nameInput, { target: { value: 'Mock' } });
  fireEvent.change(emailInput, { target: { value: 'mock@mock.com' } });
  fireEvent.change(passwordInput, { target: { value: 'mockmock' } });

  // Find and click the "Save" button
  const saveButton = screen.getByText(/save/i);
  fireEvent.click(saveButton);

  // Assert that the clickSave function was called with the correct form mode
  expect(mockClickSave).toHaveBeenCalledWith('Add');
});

test('Should update a customer when the form is submitted', () => {
  // Render the CustomerForm component with required props
  render(
    <MemoryRouter>
    <CustomerForm
      customerIdForm="" // Empty to simulate adding a new customer
      customerNameForm=""
      customerEmailForm=""
      customerPassForm=""
      formMode="Update"
      handleChangeNameForm={() => {}} // Mock handleChangeNameForm
      handleChangeEmailForm={() => {}} // Mock handleChangeEmailForm
      handleChangePassForm={() => {}} // Mock handleChangePassForm
      clickSave={mockClickSave} // Mock the clickSave function
      clickDelete={mockClickDelete}
      clickCancel={() => {}}
    /></MemoryRouter>
  );

  // Find the inputs for name, email, and password
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  // Simulate user typing in the form
  fireEvent.change(nameInput, { target: { value: 'Mock' } });
  fireEvent.change(emailInput, { target: { value: 'mock@mock.com' } });
  fireEvent.change(passwordInput, { target: { value: 'mockmock' } });

  // Find and click the "Save" button
  const saveButton = screen.getByText(/save/i);
  fireEvent.click(saveButton);

  // Assert that the clickSave function was called with the correct form mode
  expect(mockClickSave).toHaveBeenCalledWith('Update');
});

test('Should delete a customer', () => {
  // Render the CustomerForm component with required props
  render(
    <MemoryRouter>
    <CustomerForm
      customerIdForm="Mock" // Empty to simulate adding a new customer
      customerNameForm="Mock"
      customerEmailForm="Mock"
      customerPassForm="Mock"
      formMode="Update"
      handleChangeNameForm={() => {}} // Mock handleChangeNameForm
      handleChangeEmailForm={() => {}} // Mock handleChangeEmailForm
      handleChangePassForm={() => {}} // Mock handleChangePassForm
      clickSave={mockClickSave} // Mock the clickSave function
      clickDelete={mockClickDelete}
      clickCancel={() => {}}
    /></MemoryRouter>
  );

  // Find the inputs for name, email, and password
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  // Simulate user typing in the form
  fireEvent.change(nameInput, { target: { value: 'Mock' } });
  fireEvent.change(emailInput, { target: { value: 'mock@mock.com' } });
  fireEvent.change(passwordInput, { target: { value: 'mockmock' } });

  // Find the delete button
  const deleteButton = screen.getByText(/delete/i);

  // Simula el clic en el botón de "Delete"
  fireEvent.click(deleteButton);

  // Assert that the clickDelete function was called
  expect(mockClickDelete).toHaveBeenCalledWith("Mock")
  expect(nameInput.value).toBe("Mock")
  expect(emailInput.value).toBe("Mock")
  expect(passwordInput.value).toBe("Mock")
});


test("Should cancel a selection", () => {
  // Render the CustomerForm component with required props
  render(
    <MemoryRouter>
    <CustomerForm
      customerIdForm="Mock" // Empty to simulate adding a new customer
      customerNameForm="Mock"
      customerEmailForm="Mock"
      customerPassForm="Mock"
      formMode="Update"
      handleChangeNameForm={() => {}} // Mock handleChangeNameForm
      handleChangeEmailForm={() => {}} // Mock handleChangeEmailForm
      handleChangePassForm={() => {}} // Mock handleChangePassForm
      clickSave={mockClickSave} // Mock the clickSave function
      clickDelete={mockClickDelete}
      clickCancel={mockClickCancel}
    /></MemoryRouter>
  );

  // Find the inputs for name, email, and password
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  

  // Find the delete button
  const cancelButton = screen.getByText(/cancel/i);

  // Simula el clic en el botón de "Delete"
  fireEvent.click(cancelButton);

  // Assert that the clickDelete function was called
  expect(mockClickCancel).toHaveBeenCalledWith("Mock")
 
})

test("Customers are loaded correctly",() =>{
  render(
    <MemoryRouter>
    <CustomerList
    data={mockCustomers}
    selectUserInForm={() => {}}
    customerIdForm=""
    nCustomers={mockCustomers.length}
    /></MemoryRouter>
  );

  const user1 = screen.getByText(/John Doe/i)
  const user2 = screen.getByText(/Jane Smith/i)
  const user3 = screen.getByText(/Alice Johnson/i)

  expect(user1).toBeInTheDocument()
  expect(user2).toBeInTheDocument()
  expect(user3).toBeInTheDocument()

})

test("Select a user in the list", () => {
  render(
    <MemoryRouter>
    <CustomerList
    data={mockCustomers}
    selectUserInForm={() => {}}
    customerIdForm="1"
    nCustomers={mockCustomers.length}
    /></MemoryRouter>
  );

  const update = screen.getByText(/John Doe/i)
  expect(update).toBeInTheDocument()

})