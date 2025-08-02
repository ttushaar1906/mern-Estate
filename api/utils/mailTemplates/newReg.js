export const newReg = (userName, userEmail, rDate) => {
    let body = `
    
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Find Stay - Registration Successful</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #2da8be 0%, #1e8ba0 100%);
            color: white;
            padding: 40px 0;
            text-align: center;
        }

        .logo {
            font-size: 28px;
            font-weight: bold;
            color: white;
        }

        .logo img {
            width: 70px;
            height: auto;
            object-fit: contain;
            border-radius: 8px;
        }

        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
        }

        .content {
            padding: 40px 30px;
        }

        .welcome-message {
            text-align: center;
            margin-bottom: 30px;
        }

        .welcome-title {
            color: #2da8be;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .welcome-text {
            font-size: 16px;
            color: #666;
            margin-bottom: 20px;
        }

        .user-info {
            background-color: #f8fffe;
            border: 1px solid #e1f4f6;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }

        .user-info h3 {
            color: #2da8be;
            margin-bottom: 15px;
            font-size: 18px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e8f4f5;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .info-label {
            font-weight: 600;
            color: #555;
            flex: 1;
        }

        .info-value {
            color: #333;
            flex: 2;
            text-align: right;
        }

        .features {
            margin: 30px 0;
        }

        .features h3 {
            color: #2da8be;
            margin-bottom: 20px;
            font-size: 18px;
        }

        .feature-list {
            list-style: none;
        }

        .feature-item {
            padding: 8px 0;
            color: #666;
            position: relative;
            padding-left: 25px;
        }

        .feature-item::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #2da8be;
            font-weight: bold;
        }

        .cta-section {
            text-align: center;
            margin: 40px 0;
        }


        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #2da8be 0%, #1e8ba0 100%);
            color: white !important;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.3s ease;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(45, 168, 190, 0.3);
        }

        .support-section {
            background-color: #f8fffe;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
        }

        .support-title {
            color: #2da8be;
            font-size: 18px;
            margin-bottom: 10px;
        }

        .support-text {
            color: #666;
            margin-bottom: 15px;
        }

        .support-contact {
            color: #2da8be;
            text-decoration: none;
            font-weight: 600;
        }

        .footer {
            background-color: #f0f9fa;
            padding: 30px;
            text-align: center;
            border-top: 3px solid #2da8be;
        }

        .footer-text {
            color: #666;
            font-size: 14px;
            margin-bottom: 15px;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            color: #2da8be;

        }

        .social-link {
            display: inline-block;
            margin: 0 10px;
            color: #2da8be;
            text-decoration: none;
            font-weight: 600;
        }

        .unsubscribe {
            color: #999;
            font-size: 12px;
            margin-top: 20px;
        }

        .unsubscribe a {
            color: #2da8be;
            text-decoration: none;
        }

        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                box-shadow: none;
            }

            .header,
            .content,
            .footer {
                padding: 20px;
            }

            .welcome-title {
                font-size: 20px;
            }

            .info-row {
                flex-direction: column;
                gap: 5px;
            }

            .info-value {
                text-align: left;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
                <img src="https://res.cloudinary.com/tushartharwani/image/upload/v1754050041/logo_zubn02.jpg" alt="logo"
                    srcset="">
            </div>
            <div class="header-subtitle">Your Perfect Home Awaits</div>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="welcome-message">
                <h1 class="welcome-title">Welcome to Find Stay!</h1>
                <p class="welcome-text">Congratulations! Your account has been successfully created. You're now part of
                    our exclusive real estate community.</p>
            </div>

            <!-- User Information -->
            <div class="user-info">
                <h3>Your Account Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #e8f4f5;">
                        <td style="padding: 8px 0; font-weight: 600; color: #555;">User Name:</td>
                        <td style="padding: 8px 0; text-align: right; color: #333;">${userName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e8f4f5;">
                        <td style="padding: 8px 0; font-weight: 600; color: #555;">Email:</td>
                        <td style="padding: 8px 0; text-align: right; color: #333;">
                            <span style="color: #333; text-decoration: none;">${userEmail.replace('@', '&#8203;@')}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #555;">Registration Date:</td>
                        <td style="padding: 8px 0; text-align: right; color: #333;">${rDate}</td>
                    </tr>
                </table>
            </div>


            <!-- Features -->
            <div class="features">
                <h3>What You Can Do Now</h3>
                <ul class="feature-list">
                    <li class="feature-item">Browse thousands of premium property listings</li>
                    <li class="feature-item">Save your favorite properties to wishlist</li>
                    <li class="feature-item">Get instant notifications for new listings</li>
                    <li class="feature-item">Access detailed property analytics and market trends</li>
                    <li class="feature-item">Connect directly with verified real estate agents</li>
                    <li class="feature-item">Schedule virtual and in-person property tours</li>
                </ul>
            </div>

            <!-- CTA Button -->
            <div class="cta-section">
                <a href="https://findstayy.vercel.app/" class="cta-button">Start Exploring Properties</a>
            </div>

            <!-- Support Section -->
            <div class="support-section">
                <h3 class="support-title">Need Help Getting Started?</h3>
                <p class="support-text">Our dedicated support team is here to help you make the most of your Find Stay
                    experience.</p>
                <a href="mailto:test.tushar19@gmail.com" class="support-contact">Contact Support</a>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">Thank you for choosing Find Stay for your real estate journey!</p>

            <div class="social-links">
                <a href="https://tushartharwani.netlify.app/" class="social-link">Portfolio</a>
                <a href="https://x.com/tushaar_19" class="social-link">Twitter</a>
                <a href="https://www.linkedin.com/in/tushar-tharwani/" class="social-link">LinkedIn</a>
                <a href="https://www.instagram.com/_tushaar_19/" class="social-link">Instagram</a>
            </div>

            <p class="footer-text">
                Find Stay Inc.<br>
                123 Main Street, Suite 400<br>
                Pune, India
            </p>

            <div class="unsubscribe">
                <p>You received this email because you registered for a Find Stay account.</p>
            </div>
        </div>
    </div>
</body>

</html>`;
    return (body)
}