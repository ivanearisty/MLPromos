# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.11

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Create working directory
WORKDIR /backend

# Install poetry and verify requirements
COPY pyproject.toml poetry.lock ./
RUN pip install poetry

# Configure Poetry to not create a virtual environment
RUN poetry config virtualenvs.create false

# Install project dependencies using Poetry
RUN poetry install --no-dev --no-root

# Copy your application code
COPY . .

# Creates a non-root user with an explicit UID and adds permission to access the /backend folder
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /backend
USER appuser

EXPOSE 8000

# Start your application
CMD ["python", "src/main.py"]
