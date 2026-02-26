from flask import Flask,request,render_template,flash
from flask_mail import Mail, Message
import secrets

app = Flask(__name__)
app.secret_key=secrets.token_hex(16)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'podoyanntheophile@gmail.com'
app.config['MAIL_PASSWORD'] = 'yfyg fses zcef fyze'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

@app.route("/", methods=['POST','GET'])
def index():
    if request.method=='POST':
        try:
            data = request.form
            name = data['name']
            email = data['email']
            subject = data['subject']
            message = data['message']
            
          
            msg = Message(
                subject=f"Nouveau message de {name}: {subject}", 
                sender=app.config['MAIL_USERNAME'],  
                recipients=['podoyanntheophile@gmail.com'],
                reply_to = email

            )
            # Corps du message plus complet
            msg.body = f"""
            Nom: {name}
            Email: {email}
            Message:
            {message}
            """
            
            msg.html = f"""
            <h3>Nouveau message de contact</h3>
            <p><strong>Nom:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Sujet:</strong> {subject}</p>
            <p><strong>Message:</strong></p>
            <p>{message}</p>
            """  
            mail.send(msg)
            flash("Message envoyé avec success","success")
        except Exception as e:
            flash(f"Erreur: {str(e)}","erreur") 
    return render_template('index.html')

if __name__ == '__main__':
    app.run()

    