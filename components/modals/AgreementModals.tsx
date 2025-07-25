"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AgreementModals = () => {
  const [openModal, setOpenModal] = useState<"terms" | "user" | "privacy" | null>(null);

  const closeModal = () => setOpenModal(null);

  return (
    <>
      {/* Terms of Service Modal */}
      <Dialog open={openModal === "terms"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_100%)]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(222.2_84%_4.9%)]">Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-[hsl(222.2_84%_4.9%)]">
            <p className="font-medium">Last Updated: January 1, 2024</p>
            
            <div>
              <h3 className="font-semibold mb-2">1. Introduction</h3>
              <p className="text-sm leading-relaxed">
                Welcome to our platform. These Terms of Service govern your use of our website and services. 
                By accessing or using our service, you agree to be bound by these terms.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. User Responsibilities</h3>
              <p className="text-sm leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. 
                You agree to accept responsibility for all activities that occur under your account.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Content Ownership</h3>
              <p className="text-sm leading-relaxed">
                You retain ownership of any content you submit or display on our platform. 
                However, by posting content, you grant us a worldwide, non-exclusive license to use, 
                reproduce, and display such content.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Prohibited Activities</h3>
              <ul className="list-disc pl-5 text-sm space-y-2">
                <li>Violating any laws or regulations</li>
                <li>Posting false or misleading information</li>
                <li>Engaging in fraudulent activities</li>
                <li>Uploading viruses or malicious code</li>
                <li>Harassing other users</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. Termination</h3>
              <p className="text-sm leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                onClick={closeModal}
                className="bg-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_35%)]"
              >
                I Understand
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Agreement Modal */}
      <Dialog open={openModal === "user"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_100%)]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(222.2_84%_4.9%)]">User Agreement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-[hsl(222.2_84%_4.9%)]">
            <p className="font-medium">Effective Date: January 1, 2024</p>
            
            <div>
              <h3 className="font-semibold mb-2">1. Account Registration</h3>
              <p className="text-sm leading-relaxed">
                To access certain features, you must register for an account. You agree to provide accurate 
                and complete information and keep your account information updated.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Service Modifications</h3>
              <p className="text-sm leading-relaxed">
                We reserve the right to modify or discontinue the Service at any time without notice. 
                We shall not be liable to you or any third party for any modification, suspension, 
                or discontinuance of the Service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Payments and Fees</h3>
              <p className="text-sm leading-relaxed">
                Certain services may require payment. You agree to pay all applicable fees and taxes. 
                All payments are non-refundable unless otherwise stated.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Dispute Resolution</h3>
              <p className="text-sm leading-relaxed">
                Any disputes arising from this agreement will be resolved through binding arbitration 
                rather than in court, except that you may assert claims in small claims court if your claims qualify.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. Governing Law</h3>
              <p className="text-sm leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the state 
                where our company is registered, without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                onClick={closeModal}
                className="bg-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_35%)]"
              >
                I Understand
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Modal */}
      <Dialog open={openModal === "privacy"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_100%)]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(222.2_84%_4.9%)]">Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-[hsl(222.2_84%_4.9%)]">
            <p className="font-medium">Last Revised: January 1, 2024</p>
            
            <div>
              <h3 className="font-semibold mb-2">1. Information We Collect</h3>
              <p className="text-sm leading-relaxed">
                We collect personal information you provide when registering, such as name, email, 
                and payment details. We also automatically collect usage data through cookies and 
                similar technologies.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. How We Use Information</h3>
              <p className="text-sm leading-relaxed">
                We use your information to provide and improve our services, process transactions, 
                communicate with you, and for security and fraud prevention.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Information Sharing</h3>
              <p className="text-sm leading-relaxed">
                We do not sell your personal information. We may share information with service 
                providers, for legal compliance, or during business transfers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Data Security</h3>
              <p className="text-sm leading-relaxed">
                We implement appropriate security measures to protect your information. However, 
                no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. Your Rights</h3>
              <p className="text-sm leading-relaxed">
                You may access, correct, or delete your personal information. You can opt-out of 
                marketing communications and manage cookie preferences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">6. Children&apos;s Privacy</h3>
              <p className="text-sm leading-relaxed">
                Our service is not intended for children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </div>

            <div className="pt-4">
              <Button 
                onClick={closeModal}
                className="bg-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_35%)]"
              >
                I Understand
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Links to open modals - to be placed in your form */}
      <div className="text-sm text-[hsl(215.4_16.3%_46.9%)]">
        <span>Yes, I understand and agree to the </span>
        <button 
          onClick={() => setOpenModal("terms")}
          className="text-[hsl(160_84%_39%)] underline hover:text-[hsl(160_84%_50%)]"
        >
          Terms of Service
        </button>
        <span>, including the </span>
        <button 
          onClick={() => setOpenModal("user")}
          className="text-[hsl(160_84%_39%)] underline hover:text-[hsl(160_84%_50%)]"
        >
          User Agreement
        </button>
        <span> and </span>
        <button 
          onClick={() => setOpenModal("privacy")}
          className="text-[hsl(160_84%_39%)] underline hover:text-[hsl(160_84%_50%)]"
        >
          Privacy Policy
        </button>
        <span>.</span>
      </div>
    </>
  );
};

export default AgreementModals;