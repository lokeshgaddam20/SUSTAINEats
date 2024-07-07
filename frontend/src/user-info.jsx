import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthContext } from '@/components/auth/AuthContext';

const UserInfo = () => {
  const [age, setAge] = useState('');
  const [disease, setDisease] = useState('');
  const [location, setLocation] = useState('');
  const [allergies, setAllergies] = useState('');
  const { updateUserDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserDetails({ age, disease, location, allergies });
    navigate('/foods');
  };

  return (
    <div className='login-container'>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
        <div className="flex items-center justify-center py-12">
          <Card className="mx-auto grid w-[400px] gap-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Additional Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mt-8">
                <div className="grid gap-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="30" value={age}
                    onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="disease">Disease</Label>
                  <Input id="disease" placeholder="None" value={disease}
                    onChange={(e) => setDisease(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, Country" value={location}
                    onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Input id="allergies" placeholder="None" value={allergies}
                    onChange={(e) => setAllergies(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
};

export default UserInfo;
