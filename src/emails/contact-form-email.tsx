import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

const ContactFormEmail = ({ name, email, message }: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New message from your Verdant Scribe contact form</Preview>
    <Body
      style={{
        backgroundColor: '#f5f5dc',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
        color: '#2d3748',
      }}
    >
      <Container
        style={{
          margin: '0 auto',
          padding: '20px 0 48px',
          width: '580px',
        }}
      >
        <Heading
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginTop: '48px',
            color: '#8FBC8F',
          }}
        >
          New Message from Verdant Scribe
        </Heading>
        <Section
          style={{
            padding: '24px',
            border: 'solid 1px #e2e8f0',
            borderRadius: '5px',
            backgroundColor: '#ffffff',
          }}
        >
          <Text style={{ margin: '0 0 16px' }}>
            You received a new message from your website contact form.
          </Text>
          <Hr style={{ borderColor: '#e2e8f0', margin: '20px 0' }} />
          <Text style={{ fontWeight: '500', marginBottom: '8px' }}>
            From: {name}
          </Text>
          <Text style={{ fontWeight: '500', marginBottom: '8px' }}>
            Email: {email}
          </Text>
          <Hr style={{ borderColor: '#e2e8f0', margin: '20px 0' }} />
          <Heading as="h2" style={{ fontSize: '20px', fontWeight: '500' }}>
            Message:
          </Heading>
          <Text style={{ lineHeight: '1.5' }}>{message}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail;