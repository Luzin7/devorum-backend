import Question from '../models/Question';
import User from '../models/User';

interface ContentDataProps {
  users: User[];
  questions: Question[];
}

export default ContentDataProps;
