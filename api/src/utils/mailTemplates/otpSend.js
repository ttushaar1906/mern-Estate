export const otpSend = (otp) => {
    let body = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password - Find Stay</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f5f5f5;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(45, 168, 190, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #2da8be 0%, #1e7a8c 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }

        .logo img {
            width: 70px;
            height: auto;
            border-radius: 8px;
        }

        .header-subtitle {
            font-size: 14px;
            font-weight: 300;
            opacity: 0.9;
            margin-top: 10px;
        }

        .content {
            padding: 40px 30px;
            text-align: center;
        }

        .icon {
            width: 80px;
            height: 80px;
            background-color: #f0f9fb;
            border-radius: 50%;
            margin: 0 auto 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid #2da8be;
        }

        .icon svg {
            width: 40px;
            height: 40px;
            fill: #2da8be;
        }

        .title {
            font-size: 24px;
            font-weight: 600;
            color: #2da8be;
            margin-bottom: 15px;
        }

        .message {
            font-size: 16px;
            color: #666;
            margin-bottom: 30px;
            line-height: 1.5;
        }

        .otp-container {
            background: linear-gradient(135deg, #f0f9fb 0%, #e6f4f7 100%);
            border: 2px dashed #2da8be;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
        }

        .otp-label {
            font-size: 14px;
            color: #2da8be;
            font-weight: 600;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #2da8be;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            margin-bottom: 10px;
        }

        .otp-validity {
            font-size: 13px;
            color: #888;
            font-style: italic;
        }

        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 25px 0;
            font-size: 14px;
            color: #856404;
        }

        .security-tips {
            text-align: left;
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }

        .security-tips h4 {
            color: #2da8be;
            margin-bottom: 12px;
            font-size: 16px;
        }

        .security-tips ul {
            margin-left: 18px;
            color: #666;
            font-size: 14px;
        }

        .security-tips li {
            margin-bottom: 6px;
        }

        .footer {
            background-color: #f8f9fa;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }

        .footer-text {
            font-size: 13px;
            color: #888 !important;
            margin-bottom: 15px;
        }

        .contact-info {
            font-size: 12px;
            color: #aaa;
            margin-bottom: 20px;
        }

        .contact-info a {
            color: #2da8be;
            text-decoration: none;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-link {
            display: inline-block;
            margin: 0 10px;
            color: #2da8be !important;
            text-decoration: none;
            font-weight: 600;
            font-size: 13px;
        }

        .unsubscribe {
            font-size: 12px;
            color: #999;
            margin-top: 15px;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 8px;
            }

            .content {
                padding: 30px 20px;
            }

            .otp-code {
                font-size: 28px;
                letter-spacing: 6px;
            }

            .header {
                padding: 25px 15px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
                <img src="https://res.cloudinary.com/tushartharwani/image/upload/v1754050041/logo_zubn02.jpg"
                    alt="logo" />
            </div>
            <div class="header-subtitle">Your Perfect Home Awaits</div>
        </div>

        <!-- Main Content -->
        <div class="content">
            <div class="icon">
                <svg viewBox="0 0 24 24">
                    <path
                        d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V19H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
                </svg>
            </div>

            <h1 class="title">Password Reset Request</h1>
            <p class="message">We received a request to reset your password for your Find Stay account. Use the one-time
                password (OTP) below to complete your password reset.</p>

            <div class="otp-container">
                <div class="otp-label">Your OTP Code</div>
                <div class="otp-code">${otp}</div>
                <div class="otp-validity">Valid for 10 minutes</div>
            </div>

            <div class="warning">
                <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email
                and consider changing your password immediately.
            </div>

            <div class="security-tips">
                <h4>🔒 Security Tips</h4>
                <ul>
                    <li>Never share your OTP with anyone</li>
                    <li>Find Stay will never ask for your OTP via phone or email</li>
                    <li>This code expires in 10 minutes for your security</li>
                    <li>Use a strong, unique password for your account</li>
                </ul>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                Need help? Contact our support team at
                <a href="mailto:test.tushar19@gmail.com">Support Team</a>
            </p>

            <div class="contact-info">
                <p>Find Stay Real Estate Platform</p>
                <p>Making property search simple and secure</p>
                <p>123 Main Street, Suite 400, Pune, India</p>
            </div>

            <div class="social-links">
                <a href="https://tushartharwani.netlify.app/" class="social-link">Portfolio</a>
                <a href="https://x.com/tushaar_19" class="social-link">Twitter</a>
                <a href="https://www.linkedin.com/in/tushar-tharwani/" class="social-link">LinkedIn</a>
                <a href="https://www.instagram.com/_tushaar_19/" class="social-link">Instagram</a>
            </div>

            <div class="unsubscribe">
                Find Stay Real Estate Platform<br />
                Making property search simple and secure
            </div>
        </div>
    </div>
</body>

</html> `

    return (body)

}