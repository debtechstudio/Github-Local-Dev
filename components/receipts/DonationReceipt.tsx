import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#E67A00',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#1E1E24',
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  label: {
    color: '#6D6D6D',
    flex: 1,
  },
  value: {
    color: '#1E1E24',
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'right',
  },
  donorInfo: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFF9F0',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E67A00',
  },
  footer: {
    marginTop: 50,
    textAlign: 'center',
    color: '#6D6D6D',
    fontSize: 10,
  },
  highlight: {
    color: '#E67A00',
    fontWeight: 'bold',
  },
});

export interface ReceiptProps {
  transactionId: string;
  amount: string;
  totalAmount: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  purpose: string;
  paymentMode: string;
  date: string;
  time: string;
  status: string;
  merchantTransactionId: string;
}

export function DonationReceipt({ 
  transactionId,
  amount,
  totalAmount,
  name,
  email,
  phone,
  address,
  purpose,
  paymentMode,
  date,
  time,
  status,
  merchantTransactionId,
}: ReceiptProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Shri Jagannath Temple</Text>
          <Text style={styles.subtitle}>Donation Receipt</Text>
        </View>

        <View style={styles.donorInfo}>
          <Text style={styles.sectionTitle}>Donor Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{phone}</Text>
          </View>
          {address && (
            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{address}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID:</Text>
            <Text style={styles.value}>{transactionId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reference No:</Text>
            <Text style={styles.value}>{merchantTransactionId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Purpose:</Text>
            <Text style={styles.value}>{purpose}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={[styles.value, styles.highlight]}>₹{amount}</Text>
          </View>
          {parseFloat(totalAmount) > parseFloat(amount) && (
            <View style={styles.row}>
              <Text style={styles.label}>Total Amount (incl. charges):</Text>
              <Text style={[styles.value, styles.highlight]}>₹{totalAmount}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Payment Mode:</Text>
            <Text style={styles.value}>{paymentMode}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, { color: status === 'SUCCESS' ? '#16A34A' : '#DC2626' }]}>
              {status}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for your generous contribution to Shri Jagannath Temple.</Text>
          <Text>This is a computer-generated receipt and does not require a signature.</Text>
          <Text>For any queries, please contact the temple administration.</Text>
        </View>
      </Page>
    </Document>
  );
}
