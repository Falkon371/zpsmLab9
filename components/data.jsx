import axios from 'axios';

const API_BASE_URL = 'https://tgryl.pl/quiz';

interface Test {
  id: string;
  name: string;
  description: string;
  tags: string[];
  level: string;
  numberOfTasks: number;
}

interface TestDetails extends Test {}

class TestService {
  // Pobiera listę wszystkich testów
  async fetchAllTests(): Promise<Test[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/tests`);
      return response.data.map((test: any) => ({
        id: test.id,
        name: test.name,
        description: test.description,
        tags: test.tags,
        level: test.level,
        numberOfTasks: test.numberOfTasks,
      }));
    } catch (error) {
      console.error('Error fetching tests:', error);
      throw error;
    }
  }

  // Pobiera szczegóły testu na podstawie jego ID
  async fetchTestDetails(testId: string): Promise<TestDetails> {
    try {
      const response = await axios.get(`${API_BASE_URL}/test/${testId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching test details for ID ${testId}:`, error);
      throw error;
    }
  }
}

export default new TestService();
