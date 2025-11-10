import { StudentDetails } from "@/types/type";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: Number(process.env.NODEMAILER_PORT),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_EMAIL_USER,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

export async function sendEmailVerificationEmail(email: string, token: string) {
  const emailVerificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_EMAIL_VERIFICATION_ENDPOINT}`;
  const url = `${emailVerificationUrl}?token=${token}`;

  try {
    console.log(`Sending email for account activation to ${email}`);
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL_USER,
      to: email,
      subject: "Activate your account",
      html: `
        <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Activation</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #d58829;
                padding: 20px;
                text-align: center;
                color: white;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
              }
              .content {
                background-color: #ffffff;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
              }
              .button {
                display: inline-block;
                background-color: #d58829;
                color: white;
                text-decoration: none;
                padding: 12px 30px;
                border-radius: 4px;
                margin: 20px 0;
                font-weight: bold;
              }
              .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #6b7280;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                color: white;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">FRACTIONAL CFO</div>
              </div>
              <div class="content">
                <h2>Account Activation</h2>
                <p>Hello,</p>
                <p>Thank you for registering with Ticket Management System.</p>
                <p>Click the button below to activate your account:</p>
                <div style="text-align: center;">
                  <a href="${url}" class="button">Activate Account</a>
                </div>
                <p>If you didn't request this email, please ignore it.</p>
                <p>Best regards,<br>The Gennext It Team</p>
              </div>
              <div class="footer">
                <p>&copy; 2025 Fractional CFO. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
      `,
    });
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error(`Error sending email!`, error);
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetPasswordUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_RESET_PASSWORD_ENDPOINT}`;
  const url = `${resetPasswordUrl}?token=${token}`;

  try {
    console.log(`Sending email to reset password to ${email}`);
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
    });
  } catch (error) {
    console.error(`Error sending email!`, error);
  }
}
// export async function sendFreeToolsEmail(email: string, recipientName?: string) {
//   try {
//     console.log(`Sending free tools email to ${email}`);
//     const info = await transporter.sendMail({
//       from: process.env.NODEMAILER_EMAIL_USER,
//       to: email,
//       subject: "Unlock Your Business Potential - Free Tools from Fractional CFO",
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Free Business Tools - Fractional CFO</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               line-height: 1.6;
//               color: #333333;
//               margin: 0;
//               padding: 0;
//             }
//             .container {
//               max-width: 600px;
//               margin: 0 auto;
//               padding: 20px;
//             }
//             .header {
//               background-color: #d58829;
//               padding: 20px;
//               text-align: center;
//               color: white;
//               border-top-left-radius: 5px;
//               border-top-right-radius: 5px;
//             }
//             .content {
//               background-color: #ffffff;
//               padding: 30px;
//               border: 1px solid #e5e7eb;
//               border-bottom-left-radius: 5px;
//               border-bottom-right-radius: 5px;
//             }
//             .tool-card {
//               background-color: #f8f9fa;
//               border-left: 4px solid #d58829;
//               padding: 20px;
//               margin: 15px 0;
//               border-radius: 4px;
//             }
//             .tool-title {
//               color: #d58829;
//               font-weight: bold;
//               font-size: 18px;
//               margin-bottom: 10px;
//             }
//             .tool-description {
//               color: #666666;
//               margin-bottom: 15px;
//             }
//             .button {
//               display: inline-block;
//               background-color: #d58829;
//               color: white;
//               text-decoration: none;
//               padding: 10px 20px;
//               border-radius: 4px;
//               font-weight: bold;
//               font-size: 14px;
//             }
//             .footer {
//               margin-top: 30px;
//               text-align: center;
//               font-size: 12px;
//               color: #6b7280;
//             }
//             .logo {
//               font-size: 24px;
//               font-weight: bold;
//               color: white;
//             }
//             .greeting {
//               color: #d58829;
//               font-weight: bold;
//             }
//             .benefits-list {
//               background-color: #fff8f0;
//               padding: 20px;
//               border-radius: 5px;
//               margin: 20px 0;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <div class="logo">FRACTIONAL CFO</div>
//             </div>
//             <div class="content">
//               <h2>Unlock Your Business Potential</h2>
//               ${recipientName ? `<p class="greeting">Dear ${recipientName},</p>` : '<p>Hello,</p>'}
              
//               <p>At Fractional CFO, we believe in empowering businesses with the right tools and insights. That's why we've curated these exclusive free resources to help you make better financial decisions and grow your business.</p>
              
//               <div class="benefits-list">
//                 <h3 style="color: #d58829; margin-top: 0;">What You'll Gain:</h3>
//                 <ul>
//                   <li>Better financial clarity</li>
//                   <li>Improved decision-making</li>
//                   <li>Time-saving automation</li>
//                   <li>Professional-grade insights</li>
//                 </ul>
//               </div>

//               <h3 style="color: #333333;">Our Free Business Tools:</h3>

//               <!-- Tool 1: Financial Health Calculator -->
//               <div class="tool-card">
//                 <div class="tool-title">💰 Financial Health Calculator</div>
//                 <div class="tool-description">
//                   Get an instant assessment of your company's financial health. Our calculator analyzes key metrics and provides actionable insights to improve your financial position.
//                 </div>
//                 <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/financial-health-calculator" class="button">Access Calculator</a>
//               </div>

//               <!-- Tool 2: Cash Flow Forecast Template -->
//               <div class="tool-card">
//                 <div class="tool-title">📊 Cash Flow Forecast Template</div>
//                 <div class="tool-description">
//                   Download our professional cash flow forecasting template. Perfect for predicting future cash positions and avoiding liquidity crises.
//                 </div>
//                 <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/cash-flow-template" class="button">Download Template</a>
//               </div>

//               <!-- Tool 3: Business Valuation Estimator -->
//               <div class="tool-card">
//                 <div class="tool-title">📈 Business Valuation Estimator</div>
//                 <div class="tool-description">
//                   Understand what your business is worth with our valuation tool. Get a realistic estimate based on industry standards and financial performance.
//                 </div>
//                 <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/valuation-estimator" class="button">Estimate Value</a>
//               </div>

//               <!-- Tool 4: Expense Optimization Analyzer -->
//               <div class="tool-card">
//                 <div class="tool-title">💡 Expense Optimization Analyzer</div>
//                 <div class="tool-description">
//                   Identify areas where you can reduce costs without compromising quality. Our analyzer highlights optimization opportunities specific to your business.
//                 </div>
//                 <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/expense-analyzer" class="button">Analyze Expenses</a>
//               </div>

//               <!-- Tool 5: ROI Calculator -->
//               <div class="tool-card">
//                 <div class="tool-title">🎯 Investment ROI Calculator</div>
//                 <div class="tool-description">
//                   Calculate the return on investment for business initiatives, marketing campaigns, or capital expenditures with our advanced ROI calculator.
//                 </div>
//                 <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/roi-calculator" class="button">Calculate ROI</a>
//               </div>

//               <div style="background-color: #f0f7ff; padding: 20px; border-radius: 5px; margin: 25px 0;">
//                 <h4 style="color: #d58829; margin-top: 0;">Need Personalized Help?</h4>
//                 <p>While our free tools provide great insights, sometimes you need expert guidance. Our fractional CFO services offer:</p>
//                 <ul>
//                   <li>Custom financial strategy</li>
//                   <li>Ongoing financial oversight</li>
//                   <li>Strategic planning sessions</li>
//                   <li>Investor-ready financial modeling</li>
//                 </ul>
//                 <a href="${process.env.NEXT_PUBLIC_BASE_URL}/services/fractional-cfo" class="button" style="background-color: #2c5aa0;">Learn About Our Services</a>
//               </div>

//               <p><strong>Why Fractional CFO?</strong> We provide enterprise-level financial expertise without the full-time cost. Perfect for growing businesses that need strategic financial leadership.</p>

//               <p>Best regards,<br>
//               <strong>The Fractional CFO Team</strong></p>
//             </div>
//             <div class="footer">
//               <p>Fractional CFO Services | Professional Financial Leadership for Growing Businesses</p>
//               <p>&copy; 2025 Fractional CFO. All rights reserved.</p>
//               <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe" style="color: #6b7280;">Unsubscribe</a> | 
//                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/privacy" style="color: #6b7280;">Privacy Policy</a></p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `,
//     });
//     console.log("Free tools email sent: %s", info.messageId);
//   } catch (error) {
//     console.error(`Error sending free tools email!`, error);
//   }
// }

// export async function sendFreeToolsEmail(email: string, recipientName?: string) {
//   try {
//     console.log(`Sending free tools email to ${email}`);
//     const info = await transporter.sendMail({
//       from: process.env.NODEMAILER_EMAIL_USER,
//       to: email,
//       subject: "Your Requested Financial Tools",
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Financial Tools - Fractional CFO</title>
//           <style>
//             body {
//               font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
//               line-height: 1.7;
//               color: #1a1a1a;
//               margin: 0;
//               padding: 0;
//               background-color: #f5f5f5;
//             }
//             .container {
//               max-width: 580px;
//               margin: 40px auto;
//               background-color: #ffffff;
//               border-radius: 8px;
//               overflow: hidden;
//               box-shadow: 0 2px 8px rgba(0,0,0,0.08);
//             }
//             .header {
//               padding: 32px 40px 24px;
//               border-bottom: 1px solid #e8e8e8;
//             }
//             .logo {
//               font-size: 15px;
//               font-weight: 600;
//               color: #d58829;
//               letter-spacing: 0.5px;
//               text-transform: uppercase;
//             }
//             .content {
//               padding: 32px 40px 40px;
//             }
//             .content p {
//               margin: 0 0 16px;
//               color: #404040;
//             }
//             .content h2 {
//               font-size: 22px;
//               font-weight: 600;
//               color: #1a1a1a;
//               margin: 0 0 20px;
//               line-height: 1.3;
//             }
//             .tools-section {
//               margin: 28px 0;
//             }
//             .tool-item {
//               padding: 16px 0;
//               border-bottom: 1px solid #f0f0f0;
//             }
//             .tool-item:last-child {
//               border-bottom: none;
//             }
//             .tool-name {
//               font-weight: 600;
//               color: #1a1a1a;
//               font-size: 15px;
//               margin-bottom: 6px;
//             }
//             .tool-desc {
//               color: #666666;
//               font-size: 14px;
//               line-height: 1.6;
//               margin-bottom: 10px;
//             }
//             .tool-link {
//               color: #d58829;
//               text-decoration: none;
//               font-size: 14px;
//               font-weight: 500;
//             }
//             .tool-link:hover {
//               text-decoration: underline;
//             }
//             .divider {
//               height: 1px;
//               background-color: #e8e8e8;
//               margin: 32px 0;
//             }
//             .cta-section {
//               background-color: #fafafa;
//               padding: 24px;
//               border-radius: 6px;
//               margin: 28px 0;
//             }
//             .cta-section p {
//               margin: 0 0 12px;
//               font-size: 14px;
//             }
//             .cta-button {
//               display: inline-block;
//               background-color: #d58829;
//               color: white;
//               text-decoration: none;
//               padding: 11px 22px;
//               border-radius: 5px;
//               font-weight: 500;
//               font-size: 14px;
//               margin-top: 8px;
//             }
//             .signature {
//               margin-top: 32px;
//               color: #404040;
//             }
//             .signature-name {
//               font-weight: 500;
//               color: #1a1a1a;
//             }
//             .footer {
//               padding: 24px 40px;
//               background-color: #fafafa;
//               border-top: 1px solid #e8e8e8;
//               text-align: center;
//             }
//             .footer p {
//               margin: 0;
//               font-size: 12px;
//               color: #999999;
//               line-height: 1.6;
//             }
//             .footer a {
//               color: #999999;
//               text-decoration: none;
//             }
//             .footer a:hover {
//               text-decoration: underline;
//             }
//             .footer-links {
//               margin-top: 12px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <div class="logo">Fractional CFO</div>
//             </div>
            
//             <div class="content">
//               <h2>${recipientName ? `Hi ${recipientName}` : 'Hi there'},</h2>
              
//               <p>Thanks for your interest in our financial tools. I've put together the resources you requested below—these are the same tools we use with our clients to get quick insights into their financials.</p>
              
//               <p>Each one is designed to give you practical answers without the complexity of traditional financial analysis software.</p>

//               <div class="tools-section">
//                 <div class="tool-item">
//                   <div class="tool-name">Financial Health Assessment</div>
//                   <div class="tool-desc">See how your key financial metrics stack up. Takes about 5 minutes and gives you a clear picture of where you stand.</div>
//                   <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/financial-health-calculator" class="tool-link">Run assessment →</a>
//                 </div>

//                 <div class="tool-item">
//                   <div class="tool-name">Cash Flow Forecast</div>
//                   <div class="tool-desc">A straightforward template to project your cash position over the next 3-12 months. Helps you spot potential shortfalls before they happen.</div>
//                   <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/cash-flow-template" class="tool-link">Get template →</a>
//                 </div>

//                 <div class="tool-item">
//                   <div class="tool-name">Business Valuation Estimator</div>
//                   <div class="tool-desc">Get a ballpark valuation based on your revenue and industry. Useful for planning exits or understanding your current worth.</div>
//                   <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/valuation-estimator" class="tool-link">Estimate value →</a>
//                 </div>

//                 <div class="tool-item">
//                   <div class="tool-name">Expense Analysis</div>
//                   <div class="tool-desc">Upload your expenses and see where you might be overspending. Most businesses find at least 2-3 areas to optimize.</div>
//                   <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/expense-analyzer" class="tool-link">Analyze expenses →</a>
//                 </div>

//                 <div class="tool-item">
//                   <div class="tool-name">ROI Calculator</div>
//                   <div class="tool-desc">Quickly calculate returns on investments, campaigns, or projects. Includes payback period and break-even analysis.</div>
//                   <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/roi-calculator" class="tool-link">Calculate ROI →</a>
//                 </div>
//               </div>

//               <div class="divider"></div>

//               <p>These tools will give you some good initial insights, but they work best when combined with someone who knows your business context. If you'd like help interpreting what you find or want to discuss your specific situation, I'm happy to set up a quick call.</p>

//               <div class="cta-section">
//                 <p><strong>Need more than tools?</strong></p>
//                 <p>We work with businesses that need ongoing financial guidance but aren't ready for a full-time CFO. That usually means strategic planning, monthly financial reviews, and someone to help make sense of your numbers.</p>
//                 <a href="${process.env.NEXT_PUBLIC_BASE_URL}/services/fractional-cfo" class="cta-button">Learn more about our services</a>
//               </div>

//               <div class="signature">
//                 <p>Best,</p>
//                 <p class="signature-name">The Fractional CFO Team</p>
//               </div>
//             </div>

//             <div class="footer">
//               <p>Fractional CFO Services</p>
//               <div class="footer-links">
//                 <a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe">Unsubscribe</a> · 
//                 <a href="${process.env.NEXT_PUBLIC_BASE_URL}/privacy">Privacy Policy</a>
//               </div>
//             </div>
//           </div>
//         </body>
//         </html>
//       `,
//     });
//     console.log("Free tools email sent: %s", info.messageId);
//   } catch (error) {
//     console.error(`Error sending free tools email!`, error);
//   }
// }
export async function sendFreeToolsEmail(email: string, recipientName?: string) {
  try {
    console.log(`Sending free tools email to ${email}`);
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL_USER,
      to: email,
      subject: "Your Requested Financial Tools",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Financial Tools - Fractional CFO</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              line-height: 1.7;
              color: #1a1a1a;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 580px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            }
            .header {
              padding: 32px 40px 24px;
              border-bottom: 1px solid #e8e8e8;
            }
            .logo {
              font-size: 15px;
              font-weight: 600;
              color: #d58829;
              letter-spacing: 0.5px;
              text-transform: uppercase;
            }
            .content {
              padding: 32px 40px 40px;
            }
            .content p {
              margin: 0 0 16px;
              color: #404040;
            }
            .content h2 {
              font-size: 22px;
              font-weight: 600;
              color: #1a1a1a;
              margin: 0 0 20px;
              line-height: 1.3;
            }
            .tools-section {
              margin: 28px 0;
            }
            .tool-item {
              padding: 16px 0;
              border-bottom: 1px solid #f0f0f0;
            }
            .tool-item:last-child {
              border-bottom: none;
            }
            .tool-name {
              font-weight: 600;
              color: #1a1a1a;
              font-size: 15px;
              margin-bottom: 6px;
            }
            .tool-desc {
              color: #666666;
              font-size: 14px;
              line-height: 1.6;
              margin-bottom: 10px;
            }
            .tool-link {
              color: #d58829;
              text-decoration: none;
              font-size: 14px;
              font-weight: 500;
            }
            .tool-link:hover {
              text-decoration: underline;
            }
            .divider {
              height: 1px;
              background-color: #e8e8e8;
              margin: 32px 0;
            }
            .cta-section {
              background-color: #fafafa;
              padding: 24px;
              border-radius: 6px;
              margin: 28px 0;
            }
            .cta-section p {
              margin: 0 0 12px;
              font-size: 14px;
            }
            .cta-button {
              display: inline-block;
              background-color: #d58829;
              color: white;
              text-decoration: none;
              padding: 11px 22px;
              border-radius: 5px;
              font-weight: 500;
              font-size: 14px;
              margin-top: 8px;
            }
            .signature {
              margin-top: 32px;
              color: #404040;
            }
            .signature-name {
              font-weight: 500;
              color: #1a1a1a;
            }
            .footer {
              padding: 24px 40px;
              background-color: #fafafa;
              border-top: 1px solid #e8e8e8;
              text-align: center;
            }
            .footer p {
              margin: 0;
              font-size: 12px;
              color: #999999;
              line-height: 1.6;
            }
            .footer a {
              color: #999999;
              text-decoration: none;
            }
            .footer a:hover {
              text-decoration: underline;
            }
            .footer-links {
              margin-top: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Fractional CFO</div>
            </div>
            
            <div class="content">
              <h2>${recipientName ? `Hi ${recipientName}` : 'Hi there'},</h2>
              
              <p>Thanks for your interest in our financial tools. I've put together the resources you requested below—these are the same tools we use with our clients to get quick insights into their financials.</p>
              
              <p>Each one is designed to give you practical answers without the complexity of traditional financial analysis software.</p>

              <div class="tools-section">
                <div class="tool-item">
                  <div class="tool-name">Financial Health Assessment</div>
                  <div class="tool-desc">See how your key financial metrics stack up. Takes about 5 minutes and gives you a clear picture of where you stand.</div>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/financial-health-calculator" class="tool-link">Run assessment →</a>
                </div>

                <div class="tool-item">
                  <div class="tool-name">Cash Flow Forecast</div>
                  <div class="tool-desc">A straightforward template to project your cash position over the next 3-12 months. Helps you spot potential shortfalls before they happen.</div>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/cash-flow-template" class="tool-link">Get template →</a>
                </div>

                <div class="tool-item">
                  <div class="tool-name">Business Valuation Estimator</div>
                  <div class="tool-desc">Get a ballpark valuation based on your revenue and industry. Useful for planning exits or understanding your current worth.</div>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/valuation-estimator" class="tool-link">Estimate value →</a>
                </div>

                <div class="tool-item">
                  <div class="tool-name">Expense Analysis</div>
                  <div class="tool-desc">Upload your expenses and see where you might be overspending. Most businesses find at least 2-3 areas to optimize.</div>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/expense-analyzer" class="tool-link">Analyze expenses →</a>
                </div>

                <div class="tool-item">
                  <div class="tool-name">ROI Calculator</div>
                  <div class="tool-desc">Quickly calculate returns on investments, campaigns, or projects. Includes payback period and break-even analysis.</div>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tools/roi-calculator" class="tool-link">Calculate ROI →</a>
                </div>
              </div>

              <div class="divider"></div>

              <p>These tools will give you some good initial insights, but they work best when combined with someone who knows your business context. If you'd like help interpreting what you find or want to discuss your specific situation, I'm happy to set up a quick call.</p>

              <div class="cta-section">
                <p><strong>Need more than tools?</strong></p>
                <p>We work with businesses that need ongoing financial guidance but aren't ready for a full-time CFO. That usually means strategic planning, monthly financial reviews, and someone to help make sense of your numbers.</p>
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/services/fractional-cfo" class="cta-button">Learn more about our services</a>
              </div>

              <div class="signature">
                <p>Best,</p>
                <p class="signature-name">The Fractional CFO Team</p>
              </div>
            </div>

            <div class="footer">
              <p>Fractional CFO Services</p>
              <div class="footer-links">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe">Unsubscribe</a> · 
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/privacy">Privacy Policy</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log("Free tools email sent: %s", info.messageId);
  } catch (error) {
    console.error(`Error sending free tools email!`, error);
  }
}
export async function sendEmailAbsenceEmail(
  date: string,
  fromTime: string,
  toTime: string,
  studentDetails: StudentDetails
) {
  try {
    console.log(
      `Sending email for absence reporting to ${studentDetails.fatherEmail}`
    );

    // networkDiagnostics().catch(console.error);
    // advancedNetworkDiagnostics()
    //   .then((result) => console.log("Successful Connection:", result))
    //   .catch((error) => console.error("Final Diagnostic Failure:", error));
    // getNetworkInfo();
    const emailContent = `
      <div>
        <p>Dear Mr. <strong>${studentDetails.fatherName}</strong>,</p>
        <p>This is to inform you that your ward <strong>${studentDetails.studentName}</strong> was absent in the following class:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Detail</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Information</th>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; padding: 8px;"><strong>Phase</strong></td>
            <td style="border: 1px solid #dddddd; padding: 8px;">${studentDetails.phase}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; padding: 8px;"><strong>Subject</strong></td>
            <td style="border: 1px solid #dddddd; padding: 8px;">${studentDetails.subject}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; padding: 8px;"><strong>Batch</strong></td>
            <td style="border: 1px solid #dddddd; padding: 8px;">${studentDetails.batch}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; padding: 8px;"><strong>Date</strong></td>
            <td style="border: 1px solid #dddddd; padding: 8px;">${date}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; padding: 8px;"><strong>Time</strong></td>
            <td style="border: 1px solid #dddddd; padding: 8px;">${fromTime} - ${toTime}</td>
          </tr>
        </table>
        <p>Regards,</p>
        <p>[PIMS Absence Management System]</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL_USER,
      to: studentDetails.fatherEmail,
      subject: "Student Absence Notification",
      html: emailContent,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error(`Error sending email!`, error);
  }
}

const dns = require("dns");
const net = require("net");

// DNS Resolution Test
function testDNSResolution() {
  return new Promise((resolve, reject) => {
    dns.resolve("smtp.gmail.com", (err: any, addresses: unknown) => {
      if (err) {
        console.error("DNS Resolution Error:", err);
        reject(err);
      } else {
        console.log("Resolved SMTP Addresses:", addresses);
        resolve(addresses);
      }
    });
  });
}

// Direct Socket Connection Test
function testSocketConnection() {
  return new Promise<void>((resolve, reject) => {
    const socket = new net.Socket();

    socket.setTimeout(5000);

    socket.connect(587, "smtp.gmail.com", () => {
      console.log("Socket Connection Successful");
      socket.destroy();
      resolve();
    });

    socket.on("error", (err: any) => {
      console.error("Socket Connection Error:", err);
      reject(err);
    });

    socket.on("timeout", () => {
      console.error("Socket Connection Timeout");
      socket.destroy();
      reject(new Error("Connection Timeout"));
    });
  });
}

// Alternative Nodemailer Configuration
function createAlternativeTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    requireTLS: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL_USER,
      pass: process.env.NODEMAILER_EMAIL_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    debug: true, // Enable debugging
  });
}

// Comprehensive Network Test
async function networkDiagnostics() {
  try {
    console.log("Running DNS Resolution Test...");
    await testDNSResolution();

    console.log("Running Socket Connection Test...");
    await testSocketConnection();

    console.log("Creating Alternative Transporter...");
    const transporter = createAlternativeTransporter();

    console.log("Verifying Transporter...");
    await transporter.verify();

    console.log("All Network Tests Passed!");
  } catch (error) {
    console.error("Network Diagnostics Failed:", error);
    throw error;
  }
}

// Advanced Network Diagnostics
async function advancedNetworkDiagnostics() {
  console.log("Starting Advanced Network Diagnostics...");

  // Explicit DNS Configuration
  dns.setServers([
    "8.8.8.8", // Google's public DNS
    "1.1.1.1", // Cloudflare's DNS
  ]);

  // Multiple Connection Strategies
  const connectionStrategies = [
    {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
    },
    {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    },
    {
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL_USER,
        pass: process.env.NODEMAILER_EMAIL_PASSWORD,
      },
    },
  ];

  for (const strategy of connectionStrategies) {
    try {
      console.log("Attempting connection with strategy:", strategy);

      const transporter = nodemailer.createTransport({
        ...strategy,
        auth: {
          user: process.env.NODEMAILER_EMAIL_USER,
          pass: process.env.NODEMAILER_EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
        debug: true,
      });

      // Verify connection
      await new Promise((resolve, reject) => {
        transporter.verify((error, success) => {
          if (error) {
            console.error("Verification failed:", error);
            reject(error);
          } else {
            console.log("Verification successful");
            resolve(success);
          }
        });
      });

      // Test email sending
      const testResult = await new Promise((resolve, reject) => {
        transporter.sendMail(
          {
            from: process.env.NODEMAILER_EMAIL_USER,
            to: process.env.NODEMAILER_EMAIL_USER,
            subject: "Network Test",
            text: "This is a network diagnostics test email.",
          },
          (error, info) => {
            if (error) {
              console.error("Email sending failed:", error);
              reject(error);
            } else {
              console.log("Test email sent:", info);
              resolve(info);
            }
          }
        );
      });

      return { strategy, testResult };
    } catch (error) {
      console.error("Strategy failed:", error);
      continue;
    }
  }

  throw new Error("All connection strategies failed");
}

// Run Advanced Diagnostics

// Additional Network Utilities
function getNetworkInfo() {
  const os = require("os");
  const networkInterfaces = os.networkInterfaces();
  console.log(
    "Network Interfaces:",
    JSON.stringify(networkInterfaces, null, 2)
  );
}
