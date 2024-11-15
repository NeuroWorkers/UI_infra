from flask import Flask, render_template, request, jsonify

# Создание приложения Flask
app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['TEMPLATES_FOLDER'] = 'templates'


# Главная страница
@app.route('/')
def index():
    return render_template('index.html')


# Обработка запросов от пользователя
@app.route('/chat', methods=['POST'])
def chat():
    question = request.form['question']
    prompt = ''
    answer = ''
    return jsonify({'answer': answer})


# Запуск сервера
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)




