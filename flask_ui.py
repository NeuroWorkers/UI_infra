from flask import Flask, render_template, request, jsonify
import logging

# Создание приложения Flask
app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['TEMPLATES_FOLDER'] = 'templates'

# Настройка логгирования
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(message)s',
                    handlers=[
                        logging.FileHandler("flask.log"),
                        logging.StreamHandler()
                    ])

# Главная страница
@app.route('/')
def index():
    app.logger.info('Rendering index page')
    return render_template('index.html')

# Обработка запросов от пользователя
@app.route('/chat', methods=['POST'])
def chat():
    question = request.form['question']
    app.logger.info(f'Received question: {question}')
    
    # Here you can add your logic to generate a response
    prompt = ''
    answer = 'This is a placeholder answer'
    
    app.logger.info(f'Sending answer: {answer}')
    return jsonify({'answer': answer})

# Запуск сервера
if __name__ == '__main__':
    app.logger.info('Starting Flask server')
    app.run(host='0.0.0.0', port=5000, debug=True)
