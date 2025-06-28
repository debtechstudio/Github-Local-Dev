import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

// Register Google Fonts
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf',
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto',
    size: 'A4',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#E67A00',
    borderBottomStyle: 'solid',
    paddingBottom: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 6,
    color: '#E67A00',
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 8,
    color: '#1E1E24',
    lineHeight: 1.4,
  },
  orgDetails: {
    fontSize: 9,
    marginBottom: 2,
    color: '#1E1E24',
  },
  regDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 8,
  },
  regItem: {
    backgroundColor: '#FFF9F0',
    padding: 6,
    borderRadius: 4,
    minWidth: 140,
  },
  receiptTitle: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 20,
    color: '#1E1E24',
    fontWeight: 700,
    textAlign: 'center',
    backgroundColor: '#FFF9F0',
    padding: 8,
    borderRadius: 6,
  },
  section: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'solid',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#E67A00',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E67A00',
    borderBottomStyle: 'solid',
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    borderBottomStyle: 'solid',
    marginBottom: 2,
  },
  label: {
    color: '#4B5563',
    flex: 1,
    fontSize: 9,
    fontWeight: 400,
  },
  value: {
    color: '#111827',
    flex: 2,
    textAlign: 'right',
    fontSize: 9,
    fontWeight: 700,
  },
  highlightValue: {
    color: '#E67A00',
    fontWeight: 700,
  },
  statusValue: {
    fontWeight: 700,
  },
  statusSuccess: {
    color: '#059669',
  },
  statusFailed: {
    color: '#DC2626',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#E67A00',
    borderTopStyle: 'solid',
    paddingTop: 15,
    lineHeight: 1.4,
  },
});

interface DynamicPDFDocumentProps {
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

function ReceiptContent(props: DynamicPDFDocumentProps) {
  const {
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
  } = props;

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>JAI JAGANNATH DHAM COMMITTEE</Text>
        <Text style={styles.title}>ISNAPUR</Text>
        <Text style={styles.subtitle}>H.No.6-66/9, Isnapur Village, Patancheru (M),{'\n'}Sangareddy (D), Telangana State-502 307.</Text>
        
        <View style={styles.regDetails}>
          <View style={styles.regItem}>
            <Text style={styles.orgDetails}>Regd. No.358/2017</Text>
            <Text style={styles.orgDetails}>PAN No. AADAJI275E</Text>
          </View>
          
          <View style={styles.regItem}>
            <Text style={styles.orgDetails}>12A No.: AADAJI275EE20221</Text>
            <Text style={styles.orgDetails}>80G No.: AADAJI275EF20221</Text>
          </View>
        </View>
      </View>

      <Text style={styles.receiptTitle}>DONATION RECEIPT</Text>

      <View style={styles.section}>
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
          <Text style={[styles.value, styles.highlightValue]}>₹{amount}</Text>
        </View>
        {parseFloat(totalAmount) > parseFloat(amount) && (
          <View style={styles.row}>
            <Text style={styles.label}>Total Amount (incl. charges):</Text>
            <Text style={[styles.value, styles.highlightValue]}>₹{totalAmount}</Text>
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
          <Text style={[
            styles.value,
            styles.statusValue,
            status.toUpperCase() === 'SUCCESS' ? styles.statusSuccess : styles.statusFailed
          ]}>
            {status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Thank you for your generous contribution to Jai Jagannath Dham Committee Isnapur.</Text>
        <Text>This is a computer-generated receipt and does not require a signature.</Text>
        <Text>For any queries, please contact the temple administration.</Text>
      </View>
    </View>
  );
}

export default function DynamicPDFDocument(props: DynamicPDFDocumentProps) {
  return (
    <PDFViewer style={{ width: '100%', height: '600px' }}>
      <Document>
        <Page size={[595.28, 841.89]}>
          <ReceiptContent {...props} />
        </Page>
      </Document>
    </PDFViewer>
  );
}

// Export the content component for reuse in download
export { ReceiptContent }; 