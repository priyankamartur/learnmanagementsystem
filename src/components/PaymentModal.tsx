import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import type { Course } from "@/data/courses";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onPaymentSuccess: () => void;
}

export const PaymentModal = ({ isOpen, onClose, course, onPaymentSuccess }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "gpay" | "paypal">("upi");
  const [cardName, setCardName] = useState("Alex Morgan");
  const [cardNumber, setCardNumber] = useState("4532 8921 4012 9842");
  const [expiry, setExpiry] = useState("08/28");
  const [cvv, setCvv] = useState("382");
  const [upiId, setUpiId] = useState("alexmorgan@okaxis");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const discountAmount = course.originalPrice ? (course.originalPrice - course.price).toLocaleString("en-IN") : "0";

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      // Save enrollment to localStorage
      const progressKey = `progress-${course.id}`;
      if (!localStorage.getItem(progressKey)) {
        localStorage.setItem(progressKey, JSON.stringify([]));
      }

      toast.success(`Payment confirmed for "${course.title}"!`);
    }, 1800);
  };

  const handleFinish = () => {
    onPaymentSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0 overflow-hidden bg-card border-2 border-primary/20">
        <DialogHeader className="p-6 pb-4 border-b bg-muted/40">
          <DialogTitle className="flex items-center justify-between text-xl">
            <span className="flex items-center gap-2 font-extrabold">
              <Lock className="h-5 w-5 text-emerald-500" />
              Secure Checkout (INR)
            </span>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 text-xs font-semibold">
              256-Bit SSL Encrypted
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="p-8 text-center space-y-6">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/20 shadow-lg">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">Order Confirmed</Badge>
              <h2 className="text-2xl font-extrabold text-foreground">Enrollment Successful!</h2>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                You now have full lifetime access to <strong className="text-foreground">"{course.title}"</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/60 text-xs text-muted-foreground flex items-center justify-between">
              <span>Receipt ID: LH-PAY-{Math.floor(100000 + Math.random() * 900000)}</span>
              <span className="font-bold text-foreground">₹{course.price.toLocaleString("en-IN")} Paid</span>
            </div>

            <Button
              onClick={handleFinish}
              className="w-full gradient-primary text-primary-foreground font-bold py-6 text-base shadow-xl gap-2"
            >
              Start Learning Now <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-6">
            {/* Course Summary Banner */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border">
              <div className="flex items-center gap-3">
                <img src={course.thumbnail} alt={course.title} className="h-12 w-16 object-cover rounded-lg shrink-0" />
                <div>
                  <p className="text-sm font-bold truncate max-w-xs">{course.title}</p>
                  <p className="text-xs text-muted-foreground">{course.totalLessons} lessons · Lifetime Access</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xl font-extrabold text-primary">₹{course.price.toLocaleString("en-IN")}</span>
                {course.originalPrice && (
                  <p className="text-xs text-muted-foreground line-through">₹{course.originalPrice.toLocaleString("en-IN")}</p>
                )}
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-2">Select Payment Method</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "upi", label: "UPI", icon: Sparkles },
                  { id: "card", label: "Card", icon: CreditCard },
                  { id: "gpay", label: "GPay", icon: Zap },
                  { id: "paypal", label: "PayPal", icon: Globe },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = paymentMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary font-bold ring-2 ring-primary/30"
                          : "bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Form Fields based on Payment Method */}
            {paymentMethod === "upi" && (
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1">Enter UPI ID</label>
                <Input
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@okaxis / username@paytm"
                  required
                  className="text-sm font-mono"
                />
                <p className="text-[11px] text-muted-foreground mt-1">Google Pay, PhonePe, Paytm, BHIM, Amazon Pay supported</p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-1">Cardholder Name</label>
                  <Input
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name on card"
                    required
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground block mb-1">Card Number</label>
                  <div className="relative">
                    <Input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 0000 0000 0000"
                      required
                      className="text-sm pr-10 font-mono"
                    />
                    <CreditCard className="h-4 w-4 absolute right-3 top-3 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-1">Expiry Date</label>
                    <Input
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      required
                      className="text-sm font-mono text-center"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground block mb-1">CVV / CVC</label>
                    <Input
                      type="password"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      required
                      className="text-sm font-mono text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {(paymentMethod === "paypal" || paymentMethod === "gpay") && (
              <div className="p-4 rounded-xl bg-muted/40 text-center space-y-2 border">
                <p className="text-xs text-muted-foreground">
                  Click "Complete Payment" to authenticate with {paymentMethod === "paypal" ? "PayPal Express Checkout" : "Google Pay"}.
                </p>
              </div>
            )}

            {/* Order Price Calculation */}
            <div className="border-t pt-4 space-y-1.5 text-xs text-muted-foreground">
              {course.originalPrice && (
                <div className="flex justify-between">
                  <span>Course Price</span>
                  <span className="line-through">₹{course.originalPrice.toLocaleString("en-IN")}</span>
                </div>
              )}
              {course.originalPrice && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Instant Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-foreground pt-1 border-t">
                <span>Total Amount Due</span>
                <span className="text-primary text-base">₹{course.price.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={processing}
              className="w-full gradient-primary text-primary-foreground font-bold py-6 text-base shadow-xl gap-2"
            >
              {processing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Processing Payment...
                </>
              ) : (
                <>
                  Complete Payment of ₹{course.price.toLocaleString("en-IN")} <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>

            <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> 30-Day Money-Back Guarantee Included
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
