import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DonationReceiptWrapper } from '@/components/receipts/DonationReceiptWrapper';
import { PaymentStatus } from '@/lib/types/payment';

interface PaymentStatusProps {
  paymentData: PaymentStatus;
}

export function PaymentStatusCard({ paymentData }: PaymentStatusProps) {
  const isSuccess = paymentData.status === 'SUCCESS';

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className={`text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          Payment {isSuccess ? 'Successful' : 'Failed'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p><strong>Transaction ID:</strong> {paymentData.txnId}</p>
            <p><strong>Order ID:</strong> {paymentData.orderId}</p>
            <p><strong>Amount:</strong> ₹{paymentData.amount}</p>
            {paymentData.surcharge && (
              <p><strong>Surcharge:</strong> ₹{paymentData.surcharge}</p>
            )}
            {paymentData.totalAmount && (
              <p><strong>Total Amount:</strong> ₹{paymentData.totalAmount}</p>
            )}
            <p><strong>Status:</strong> <span className={isSuccess ? 'text-green-600' : 'text-red-600'}>{paymentData.status}</span></p>
            <p><strong>Date:</strong> {paymentData.date}</p>
            <p><strong>Purpose:</strong> {paymentData.purpose}</p>
          </div>
          <div className="print:block" id="receipt">
            <DonationReceiptWrapper
              transactionId={paymentData.txnId}
              merchantTransactionId={paymentData.orderId}
              amount={paymentData.amount}
              totalAmount={paymentData.totalAmount || paymentData.amount}
              name={paymentData.donorName}
              email={paymentData.donorEmail}
              phone={paymentData.donorPhone}
              address=""
              purpose={paymentData.purpose}
              paymentMode={paymentData.paymentMode || 'Online'}
              date={new Date(paymentData.date).toLocaleDateString()}
              time={new Date(paymentData.date).toLocaleTimeString()}
              status={paymentData.status}
            />
          </div>
        </div>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex justify-between print:hidden">
        <Button variant="outline" onClick={() => window.location.href = '/'}>
          Return Home
        </Button>
        {isSuccess && (
          <Button onClick={() => window.print()}>
            Print Receipt
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
